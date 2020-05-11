# doggodex

A simple web app for a client-side dog breed image classifier.

### Local Python-Based Predictor

For development purposes. You will manually need to add the frozen model file `dbc_stanford_10_23.pb` to the `./python/model_assets` folder.

To run local classifier on a Flask-based server, first build and activate the conda environment using:

- `conda env create -f environment.yml`
- `conda activate doggodex`

Then navigate into `./python` and execute the following commands in terminal:

- `python predictor.py` to launch the classification service
- `python local_client.py` to launch the local client to send test images to the classifier
