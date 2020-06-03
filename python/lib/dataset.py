# lib/dataset.py

import os
import random
from collections import Counter

import pandas as pd
import tensorflow as tf
from scipy.io import loadmat
from sklearn.model_selection import train_test_split

from lib import consts
from lib import paths


# LOAD DATA
# ---------

def load_breeds_dict():
    df_breeds = pd.read_csv(paths.BREEDS_CSV)
    breeds = {}
    for index, row in df_breeds.iterrows():
        breeds[str(row['id'])] = row['breed']
    return breeds


def get_paths_and_labels_from_list(data_list):
    data = []
    files = data_list['file_list'].tolist()
    for filename in files:
        filename = filename[0].tolist()[0]
        filepath = os.path.join(paths.DATA_IMAGES, filename)
        label = filepath.split('-')[1:]
        label = '-'.join(label).lower()
        label = label.split('/')[0]
        data.append((filepath, label))

    return data


def get_data_filepaths():
    train_list = loadmat(os.path.join(paths.DATA_LISTS, 'train_list.mat'))
    test_list = loadmat(os.path.join(paths.DATA_LISTS, 'test_list.mat'))
    train_data = get_paths_and_labels_from_list(train_list)
    test_data = get_paths_and_labels_from_list(test_list)
    return train_data, test_data


# SPLIT DATA
# ----------

def print_train_test_ratio(train_data, test_data):
    total_samples = len(train_data) + len(test_data)
    print('Percentage Train: {:.1f}'.format(
        len(train_data)/total_samples * 100))
    print('Percentage Test: {:.1f}'.format(len(test_data)/total_samples * 100))


def train_valid_test_split(data, fractions=[0.75, 0.15, 0.10]):
    assert sum(fractions) == 1.0, "fractions must sum to 1.0"

    random.seed(0)
    random.shuffle(data)

    X = [x[0] for x in data]
    y = [x[1] for x in data]

    # stratify ensures class balance
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, stratify=y,
        test_size=(1-fractions[0]),
        random_state=0)

    X_valid, X_test, y_valid, y_test = train_test_split(
        X_test, y_test, stratify=y_test,
        test_size=fractions[1]/(fractions[1] + fractions[2]),
        random_state=0)

    data_train = [(x, y) for x, y in zip(X_train, y_train)]
    data_valid = [(x, y) for x, y in zip(X_valid, y_valid)]
    data_test = [(x, y) for x, y in zip(X_test, y_test)]

    return data_train, data_valid, data_test


def get_class_counts(data):
    classes = []
    for sample in data:
        classes.append(sample[1])
    return Counter(classes)


def get_dataframe_from_counts(counts_train, counts_valid, counts_test):
    class_list = []
    train_count_list = []
    valid_count_list = []
    test_count_list = []
    total_count_list = []

    index_to_breed = load_breeds_dict()
    breed_to_index = {v: u for u, v in index_to_breed.items()}

    for breed in breed_to_index.keys():
        class_list.append(breed)
        train_count_list.append(counts_train[breed])
        valid_count_list.append(counts_valid[breed])
        test_count_list.append(counts_test[breed])
        total_count_list.append(
            counts_train[breed] + counts_valid[breed] + counts_test[breed])

    table = {
        'Class Name': class_list,
        'Train Count': train_count_list,
        'Valid Count': valid_count_list,
        'Test Count': test_count_list,
        'Total Count': total_count_list
    }

    return pd.DataFrame(data=table)


def assess_class_balance(data_train, data_valid, data_test):
    counts_train = get_class_counts(data_train)
    counts_valid = get_class_counts(data_valid)
    counts_test = get_class_counts(data_test)

    df = get_dataframe_from_counts(counts_train, counts_valid, counts_test)

    df['Train Percent'] = 100*df['Train Count']/len(data_train)
    df['Train Percent'] = df['Train Percent'].apply(lambda x: round(x, 2))
    df['Valid Percent'] = 100*df['Valid Count']/len(data_valid)
    df['Valid Percent'] = df['Valid Percent'].apply(lambda x: round(x, 2))
    df['Test Percent'] = 100*df['Test Count']/len(data_test)
    df['Test Percent'] = df['Test Percent'].apply(lambda x: round(x, 2))
    df['Total Percent'] = 100*df['Total Count'] / \
        (len(data_train) + len(data_valid) + len(data_test))
    df['Total Percent'] = df['Total Percent'].apply(lambda x: round(x, 2))

    print('\nPercent Dataset Composition by Class:')
    print('Train Mean: {:.2f}, Std: {:.2f}'.format(
        df['Train Percent'].mean(), df['Train Percent'].std())
    )
    print('Valid Mean: {:.2f}, Std: {:.2f}'.format(
        df['Valid Percent'].mean(), df['Valid Percent'].std())
    )
    print('Test Mean: {:.2f}, Std: {:.2f}'.format(
        df['Test Percent'].mean(), df['Test Percent'].std())
    )

    return df


def report_on_split(data_train, data_valid, data_test):

    print('\nTrain/Valid/Test Split Report:')
    print('-------------------------------')
    print('Num training samples:', len(data_train))
    print('Num validation samples:', len(data_valid))
    print('Num test samples:', len(data_test))

    total_len = len(data_train) + len(data_valid) + len(data_test)

    print('\nPercentage Train: {:.1f}'.format(len(data_train)/total_len * 100))
    print('Percentage Valid: {:.1f}'.format(len(data_valid)/total_len * 100))
    print('Percentage Split: {:.1f}'.format(len(data_test)/total_len * 100))

    details = assess_class_balance(data_train, data_valid, data_test)

    return details


# TFRecord Conversion
# -------------------
# see https://www.tensorflow.org/tutorials/load_data/tfrecord

def _bytes_feature(value):
    """Returns a bytes_list from a string / byte."""
    return tf.train.Feature(bytes_list=tf.train.BytesList(value=[value]))


def _float_feature(value):
    """Returns a float_list from a float / double."""
    return tf.train.Feature(float_list=tf.train.FloatList(value=[value]))


def _int64_feature(value):
    """Returns an int64_list from a bool / enum / int / uint."""
    return tf.train.Feature(int64_list=tf.train.Int64List(value=[value]))


def to_serialized_tf_example(data_sample):
    """Assumes data_sample is of form ('filepath', 'label')"""

    image_string = open(data_sample[0], 'rb').read()
    label = data_sample[1]

    feature = {
        'label': _bytes_feature(label.encode('utf-8')),
        'image_raw': _bytes_feature(image_string),
    }

    tf_example = tf.train.Example(features=tf.train.Features(feature=feature))

    return tf_example.SerializeToString()


def batch(iterable, batch_size=1):
    l = len(iterable)
    for ndx in range(0, l, batch_size):
        yield iterable[ndx:min(ndx + batch_size, l)]


def write_to_tfrecords(
        data, filedir='',
        prefix='data',
        samples_per_record=consts.SAMPLES_PER_TFRECORD):
    file_index = 0
    for sample_batch in batch(data, batch_size=samples_per_record):
        filepath = os.path.join(
            filedir, prefix + '-' + f'{file_index:03}' + '.tfrecords')

        with tf.io.TFRecordWriter(filepath) as writer:
            for sample in sample_batch:
                example = to_serialized_tf_example(sample)
                writer.write(example)

        file_index += 1


if __name__ == "__main__":

    print('\nTF Version:', tf.__version__)

    print('Loading and writing the raw dataset...')
    # using the official dataset train/test split
    train_data, test_data = get_data_filepaths()

    print('Balance of official train/test split...')
    print_train_test_ratio(train_data, test_data)

    print('Resplit to 75%/15%/10% Train/Valid/Test...')
    data_train, data_valid, data_test = train_valid_test_split(
        data, fractions=[0.75, 0.15, 0.10])
    details = report_on_split(data_train, data_valid, data_test)
    details.head()
    details.to_csv(os.path.join(
        paths.DATA, 'data_split_class_distribution.csv'))

    print('Writing to TFRecords...')
    write_to_tfrecords(data_train, filedir=paths.DATA_TFR_RAW, prefix='train')
    write_to_tfrecords(data_valid, filedir=paths.DATA_TFR_RAW, prefix='valid')
    write_to_tfrecords(data_test, filedir=paths.DATA_TFR_RAW, prefix='test')

    print('Done!')
