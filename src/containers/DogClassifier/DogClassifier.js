import React, { Component } from "react";

import PhotoController from "../PhotoController/PhotoController";
import ResultsController from "../ResultsController/ResultsController";
import classes from "./DogClassifier.module.css";
import axiosPredictorEndpoint from "../../axios";

const MAX_IMAGE_WIDTH_PX = 1000;

class DogClassifier extends Component {
  state = {
    isSubmittingPhoto: true,
    isShowingResults: true,
    haveUserPhoto: false,
    importedPhotoFile: null,
    importedPhotoURL: null,
    topResults: null,
  };

  modeToggleHandler = () => {
    this.setState((prevState) => {
      return {
        isSubmittingPhoto: !prevState.isSubmittingPhoto,
        isShowingResults: !prevState.isShowingResults,
      };
    });
  };

  updatePhotoHandler = (photoFile) => {
    this.setState({
      importedPhotoFile: photoFile,
      importedPhotoURL: URL.createObjectURL(photoFile),
      haveUserPhoto: true,
    });
  };

  toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  resizeImage = (img) => {
    const shrinkFactor = MAX_IMAGE_WIDTH_PX / img.naturalWidth;
    const newWidth = img.naturalWidth * shrinkFactor;
    const newHeight = img.naturalHeight * shrinkFactor;

    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    return ctx.canvas.toDataURL("image/jpeg", 1);
  };

  preProcessImage = (file) => {
    return new Promise(async (resolve, reject) => {
      const img = new Image();
      // convert to base64 encoded string
      img.src = await this.toBase64(file);
      img.onload = () => {
        // resize image if necessary
        if (img.naturalWidth > MAX_IMAGE_WIDTH_PX) {
          resolve(this.resizeImage(img));
        } else {
          resolve(img.src);
        }
      };
    });
  };

  postProcessResults = (rawResults) => {
    const { breed, prob } = rawResults;
    const keys = Object.keys(prob);
    const rankedResults = keys
      .map((key) => ({ breed: breed[key], prob: prob[key] }))
      .sort((a, b) => b["prob"] - a["prob"]);
    return rankedResults;
  };

  updateTopResults = (rawResults) => {
    const rankedResults = this.postProcessResults(rawResults);
    this.setState({ topResults: rankedResults });
  };

  classifyImageHandler = async () => {
    console.log("Image sent for classification.");
    const imgData = await this.preProcessImage(this.state.importedPhotoFile);
    axiosPredictorEndpoint
      .post("/invocations", { image: imgData })
      .then((res) => {
        this.updateTopResults(res.data);
        // this.modeToggleHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let photoController = null;
    if (this.state.isSubmittingPhoto) {
      photoController = (
        <PhotoController
          className={classes.PhotoController}
          photo={this.state.importedPhotoURL}
          photoUpdated={this.updatePhotoHandler}
          classifyPhoto={this.classifyImageHandler}
          classifyButtonActive={this.state.haveUserPhoto}
        />
      );
    }

    let resultsController = null;
    if (this.state.isShowingResults) {
      resultsController = (
        <ResultsController
          className={classes.ResultsController}
          photo={this.state.importedPhotoURL}
          results={this.state.topResults}
        />
      );
    }

    return (
      <div className={classes.DogClassifier}>
        {photoController}
        {resultsController}
      </div>
    );
  }
}

export default DogClassifier;
