import React, { Component } from "react";

import PhotoController from "../PhotoController/PhotoController";
import ResultInfo from "../../components/Result/ResultInfo/ResultInfo";
import ResultsList from "../../components/Result/ResultsList/ResultsList";
import StyledButton from "../../components/UI/StyledButton/StyledButton";

import axiosPredictorEndpoint from "../../axios";

import classes from "./DogClassifier.module.css";

const MAX_IMAGE_WIDTH_PX = 1000;

class DogClassifier extends Component {
  state = {
    showResults: false,
    showReset: false,
    haveUserPhoto: false,
    importedPhotoFile: null,
    importedPhotoURL: null,
    topResults: null,
  };

  modeToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showResults: !prevState.showResults,
        showReset: !prevState.showReset,
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
    let results = null;
    if (this.state.showResults) {
      results = (
        <React.Fragment>
          <ResultInfo />
          <div className={classes.flexBreak}></div>
          <ResultsList />
        </React.Fragment>
      );
    }

    let reset = null;
    if (this.state.showReset) {
      reset = (
        <React.Fragment>
          <div className={["container", classes.Reset].join(" ")}>
            <StyledButton>Start Over</StyledButton>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.DogClassifer}>
        <div className={classes.Main}>
          <PhotoController
            photo={this.state.importedPhotoURL}
            photoUpdated={this.updatePhotoHandler}
            classifyPhoto={this.classifyImageHandler}
            classifyButtonActive={this.state.haveUserPhoto}
          />
          {results}
        </div>
        {reset}
      </div>
    );
  }
}

export default DogClassifier;
