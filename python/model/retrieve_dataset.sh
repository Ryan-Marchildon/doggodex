#!/bin/bash

<<COMMENT
    Run this script to download the original Stanford Dogs
    image dataset and unpack it into the appropriate 
    project directories.
COMMENT


# prepare directories
mkdir ./data
mkdir ./data/lists

# download files
curl -O http://vision.stanford.edu/aditya86/ImageNetDogs/images.tar
curl -O http://vision.stanford.edu/aditya86/ImageNetDogs/annotation.tar
curl -O http://vision.stanford.edu/aditya86/ImageNetDogs/lists.tar

# unpack to directories
tar xopf images.tar  -C ./data/
tar xopf annotation.tar  -C ./data/
tar xopf lists.tar  -C ./data/lists/

# cleanup
rm images.tar
rm annotation.tar
rm lists.tar
