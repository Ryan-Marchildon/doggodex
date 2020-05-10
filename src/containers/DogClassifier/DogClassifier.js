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

  render() {
    let photoController = null;
    if (this.state.isSubmittingPhoto) {
      photoController = (
        <PhotoController
          photo={this.state.importedPhotoURL}
          photoUpdated={this.updatePhotoHandler}
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
