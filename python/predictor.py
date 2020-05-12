from __future__ import print_function

import os
import json
import sys
import base64
import signal
import traceback

try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO

import flask
from flask_cors import CORS

import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn import preprocessing


# PATHS AND GLOBAL VARIABLES
# ==========================
LOCALHOST_PORT = 5007

CWD = os.getcwd()
MODEL_PATH = os.path.join(CWD, 'model_assets')

CURRENT_MODEL_NAME = 'dbc_stanford_10_23'
INCEPTION_INPUT_TENSOR = 'DecodeJpeg/contents:0'
OUTPUT_TENSOR_NAME = 'output_node' + ':0'

BREEDS = os.path.join(MODEL_PATH, 'breeds.csv')
CLASSES_COUNT = 120

ALLOWED_FILE_EXTENSIONS = set(['jpg', 'jpeg'])


# HELPER FUNCTIONS
# ================
# load the frozen model into a TF graph
def unfreeze_into_current_graph(model_path, tensor_names):
    with tf.gfile.FastGFile(name=model_path, mode='rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        tf.import_graph_def(graph_def, name='')
        g = tf.get_default_graph()

        tensors = {t: g.get_tensor_by_name(t) for t in tensor_names}

        return tensors


# decode predictions into their class labels
def one_hot_label_encoder():
    train_Y_orig = pd.read_csv(BREEDS, dtype={'breed': np.str})
    lb = preprocessing.LabelBinarizer()
    lb.fit(train_Y_orig['breed'])

    def encode(labels):
        return np.asarray(lb.transform(labels), dtype=np.float32)

    def decode(one_hots):
        return np.asarray(lb.inverse_transform(one_hots), dtype=np.str)

    return encode, decode


# check for allowed allowed file extension
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_FILE_EXTENSIONS


# MODEL AND SCORING SERVICE
# =========================
class ScoringService(object):
    tensors = None
    sess = None

    @classmethod
    def get_model(cls):
        # load model and new TF session, if not already loaded
        if cls.tensors == None or cls.sess == None:
            with tf.Graph().as_default(), tf.Session().as_default() as sess:

                cls.tensors = unfreeze_into_current_graph(
                    os.path.join(MODEL_PATH, CURRENT_MODEL_NAME + '.pb'),
                    tensor_names=[INCEPTION_INPUT_TENSOR, OUTPUT_TENSOR_NAME])

                cls.sess = sess

        return cls

    @classmethod
    def predict(cls, img_raw):

        clf = cls.get_model()
        _, one_hot_decoder = one_hot_label_encoder()

        probs = clf.sess.run(clf.tensors[OUTPUT_TENSOR_NAME],
                             feed_dict={clf.tensors[INCEPTION_INPUT_TENSOR]: img_raw})

        breeds = one_hot_decoder(np.identity(CLASSES_COUNT)).reshape(-1)

        df = pd.DataFrame(data={'prob': probs.reshape(-1), 'breed': breeds})

        return df.sort_values(['prob'], ascending=False)


# FLASK APP FOR SERVING PREDICTIONS
# =================================
app = flask.Flask(__name__)
CORS(app)


@app.route('/ping', methods=['GET'])
def ping():
    """
    Determine if the container is working and healthy. 
    """
    print('*** Running Health Check', file=sys.stderr)

    # health check (can we load the model successfully?)
    health = ScoringService.get_model() is not None

    status = 200 if health else 404
    return flask.Response(
        response='\n',
        status=status,
        mimetype='application/json')


@app.route('/invocations', methods=['POST'])
def transformation():
    """
    Perform inference on a single image. 
    The input is a base64 (utf-8) encoded image string. 

    """
    print('*** Transformation function invoked.', file=sys.stdout)

    request_data = flask.request.get_json()
    if not request_data['image']:
        print('>>> Image not found.', file=sys.stdout)
        return flask.Response(
            response='Bad Request: received no image.\n',
            status=400,
            mimetype='text/plain')
    else:
        print('>>> Found an attached image.', file=sys.stdout)

    # read in the file
    img_base64_string = request_data['image']

    # strip type from a JS FileReader-generated base64 string
    if img_base64_string.startswith("data:image/jpeg;base64,"):
        img_base64_string = img_base64_string.split("base64,")[1]

    img_file = base64.b64decode(img_base64_string)

    # obtain prediction
    probs_df = ScoringService.predict(img_file)

    # convert dataframe to dictionary for output
    # (only returning the top 5 results)
    result = probs_df[0:5].to_dict()

    print('>>>Result:', result, file=sys.stdout)

    return flask.jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=LOCALHOST_PORT)
