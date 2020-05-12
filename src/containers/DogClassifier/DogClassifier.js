import React, { Component } from "react";

import PhotoController from "../PhotoController/PhotoController";
import ResultsController from "../ResultsController/ResultsController";
import classes from "./DogClassifier.module.css";
import axiosPredictorEndpoint from "../../axios";

class DogClassifier extends Component {
  state = {
    isSubmittingPhoto: true,
    isShowingResults: false,
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
    const imgData = await this.toBase64(this.state.importedPhotoFile);
    axiosPredictorEndpoint
      .post("/invocations", { image: imgData })
      .then((res) => {
        this.updateTopResults(res.data);
        this.modeToggleHandler();
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
          photo={this.state.importedPhotoURL}
          photoUpdated={this.updatePhotoHandler}
          classifyPhoto={this.classifyImageHandler}
        />
      );
    }

    let resultsController = null;
    if (this.state.isShowingResults) {
      resultsController = (
        <ResultsController
          photo={this.state.importedPhotoURL}
          results={this.state.topResults}
        />
      );
    }

    return (
      <div className={classes.DogClassifier}>
        <button onClick={this.modeToggleHandler}>Toggle Mode</button>
        {photoController}
        {resultsController}
      </div>
    );
  }
}

export default DogClassifier;
