import React, { Component } from "react";

import PhotoController from "../PhotoController/PhotoController";
import ResultsController from "../ResultsController/ResultsController";
import classes from "./DogClassifier.module.css";

class DogClassifier extends Component {
  render() {
    return (
      <div className={classes.DogClassifier}>
        <PhotoController />
        <ResultsController />
      </div>
    );
  }
}

export default DogClassifier;
