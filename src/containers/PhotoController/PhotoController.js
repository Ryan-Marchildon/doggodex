import React from "react";

import StyledButton from "../../components/UI/StyledButton/StyledButton";
import PhotoFrame from "../../components/UI/PhotoFrame/PhotoFrame";

import "../../App.css";
import classes from "./PhotoController.module.css";

// TODO: upload from camera, upload from URL

const PhotoController = (props) => {
  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/jpeg") {
        props.photoUpdated(file);
      } else {
        alert(
          "Error: Image must have .jpg or .jpeg extension. Please choose a different image."
        );
      }
    }
  };

  return (
    <div className={["container", classes.PhotoController].join(" ")}>
      <div className="heading">Your Photo</div>
      <PhotoFrame photo={props.photo} />
      <StyledButton buttonType="input" fileSelected={fileSelectedHandler}>
        <strong>Select Image (JPG)</strong>
      </StyledButton>

      <StyledButton
        clicked={props.classifyPhoto}
        disabled={!props.classifyButtonActive}
      >
        <strong>Classify Breed</strong>
      </StyledButton>
    </div>
  );
};

export default PhotoController;
