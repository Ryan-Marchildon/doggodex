import sys
import base64
import os
import json
import requests
import csv
import tkinter
import PIL
from PIL import Image, ImageTk

from prettytable import PrettyTable
from tkinter.filedialog import askopenfilename

"""
Usage from terminal:
$ python client_local.py <PATH-TO-IMAGE>

	e.g.:
	$ python client_local.py ./test_imgs/poodle_1.jpg

"""

STRING_ENCODING = 'utf-8'

# API_URL = "https://osbh7tvzj3.execute-api.us-east-2.amazonaws.com/beta/classifydogbreed"
API_URL = "http://127.0.0.1:5007"

# SPECIFY THE IMAGE FILE (JPG OR JPEG ONLY)
if len(sys.argv) is not 1:
    IMG_NAME = sys.argv[1]
    IMG_PATH = os.path.join(os.getcwd(), IMG_NAME)
else:
    CWD = os.getcwd()
    IMAGES = os.path.join(CWD, 'test_images')
    IMG_PATH = askopenfilename(initialdir=IMAGES, title="Select file")


# DISPLAY STATUS TO CONSOLE
print('*** Running Dog Breed Classifier Client (Local)')
print('Image Path: ', IMG_PATH)
print('API URL: ', API_URL)


# RESIZE IMAGE IF NECESSARY
# -- There is a file size limit on AWS API requests
WIDTH_THRESHOLD = 2000  # pixels
img = Image.open(IMG_PATH)
resized = False
if img.size[0] > WIDTH_THRESHOLD:
    wpercent = (WIDTH_THRESHOLD / float(img.size[0]))
    hsize = int((float(img.size[1]) * float(wpercent)))
    img = img.resize((WIDTH_THRESHOLD, hsize), PIL.Image.ANTIALIAS)
    img.save('resized_image.jpg')
    IMG_PATH = os.path.join(os.getcwd(), 'resized_image.jpg')
    resized = True


# ENCODE IMAGE FILE
def get_base64_encoded_image(image_path):
    with open(image_path, 'rb') as img_file:
        return base64.b64encode(img_file.read()).decode(STRING_ENCODING)


base64_image_string = get_base64_encoded_image(IMG_PATH)


# GENERATE RESPONSE REQUEST
headers = {"content-type": 'application/json'}
content = json.dumps({"image": base64_image_string})

response = requests.post(API_URL + '/invocations',
                         data=content, headers=headers)

# PROCESS THE RESPONSE
res = response.json()
probs = res['prob']
breeds = res['breed']

unranked = []
for key in probs:
    unranked.append([breeds[key], probs[key]])
ranked = sorted(unranked, key=lambda x: x[1], reverse=True)


# DISPLAY THE RESULTS
print('\nTop 5 Inferred Breeds:')
results_table = PrettyTable(['Rank', 'Inferred Breed', 'Probability'])
results_table.align['Rank'] = 'r'
results_table.align['Inferred Breed'] = 'l'
results_table.align['Probability'] = 'l'
for i, entry in enumerate(ranked):
    results_table.add_row([i+1, entry[0], entry[1]])
    if i+1 == 5:
        break
print(results_table)

# CLEANUP
if resized is True:
    # delete the temporary resized image
    os.remove(IMG_PATH)
