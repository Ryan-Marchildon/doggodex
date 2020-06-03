# lib/paths.py

import os

ROOT = os.getcwd()

FRONTEND_ASSETS = os.path.join(os.pardir, 'src', 'assets')
BREEDS_JSON = os.path.join(FRONTEND_ASSETS, 'dog_breeds.json')

LIB = os.path.join(ROOT, 'lib')
MODEL = os.path.join(ROOT, 'model')

MODEL_ASSETS = os.path.join(MODEL, 'assets')
BREEDS_CSV = os.path.join(MODEL_ASSETS, 'breeds.csv')

DATA = os.path.join(MODEL, 'data')

DATA_IMAGES = os.path.join(DATA, 'Images')
DATA_LISTS = os.path.join(DATA, 'lists')

DATA_TFRECORDS = os.path.join(DATA, 'tfrecords')
DATA_TFR_RAW = os.path.join(DATA_TFRECORDS, 'raw')
DATA_TFR_PREPROC = os.path.join(DATA_TFRECORDS, 'preproc')

TEST_IMAGES = os.path.join(ROOT, 'test_images')
YORKIE_1 = os.path.join(TEST_IMAGES, 'yorkie_1.jpg')
