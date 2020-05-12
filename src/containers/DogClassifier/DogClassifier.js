import React, { Component } from "react";

import PhotoController from "../PhotoController/PhotoController";
import ResultsController from "../ResultsController/ResultsController";
import classes from "./DogClassifier.module.css";

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

  encodeImageAsBase64 = async (photofile) => {
    console.log(await this.toBase64(photofile));
  };

  classifyImageHandler = () => {
    console.log("Image sent for classification.");
    this.encodeImageAsBase64(this.state.importedPhotoFile);
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
        <ResultsController photo={this.state.importedPhotoURL} />
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
