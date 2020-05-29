# DoggoDex

DoggoDex is a simple web app for demoing a client-side dog breed image classifier.

The classifier is currently a tensorflow graph served locally via Flask. In the near-term this will be converted to an optimized TensorFlow.JS model to run directly in the browser.

Preview of current version (desktop view):
![App Preview](https://github.com/Ryan-Marchildon/doggodex/blob/master/public/github/preview_v1.png)

### Usage

1. From within the root folder, install dependencies (e.g. `yarn install`)
2. Launch the local python-based predictor (see section below).
3. Launch the React app via the development server (e.g. `yarn start`).

### Local Python-Based Predictor

For development purposes. You will manually need to add the frozen model file `dbc_stanford_10_23.pb` to the `./python/model_assets` folder (download the model file [here](https://rpm-public-assets.s3.ca-central-1.amazonaws.com/data_and_models/dbc_stanford_10_23.pb)).

To run local classifier on a Flask-based server, first build and activate the conda environment using:

- `conda env create -f environment.yml`
- `conda activate doggodex`

Then navigate into `./python` and execute the following commands in terminal:

- `python predictor.py` to launch the classification service
- `python local_client.py` to launch the local client to send test images to the classifier
