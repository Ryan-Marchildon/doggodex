# preproc/create_raw_data_tfrecords.py

import os

from lib import paths
from lib import dataset

print('Loading and writing the raw dataset...')
print('--------------------------------------')
# using the official dataset train/test split
train_data, test_data = dataset.get_data_filepaths()

print('\n-> Balance of official train/test split...')
dataset.print_train_test_ratio(train_data, test_data)

print('\n-> Resplit to 75%/15%/10% Train/Valid/Test...')
data = train_data + test_data
data_train, data_valid, data_test = dataset.train_valid_test_split(
    data, fractions=[0.75, 0.15, 0.10])
details = dataset.report_on_split(data_train, data_valid, data_test)
details.head()
details.to_csv(os.path.join(
    paths.DATA, 'data_split_class_distribution.csv'))

print('\n-> Writing to TFRecords...')
dataset.write_to_tfrecords(
    data_train, filedir=paths.DATA_TFR_RAW, prefix='train')
dataset.write_to_tfrecords(
    data_valid, filedir=paths.DATA_TFR_RAW, prefix='valid')
dataset.write_to_tfrecords(
    data_test, filedir=paths.DATA_TFR_RAW, prefix='test')

print('\n-> Done!')
print('***')
