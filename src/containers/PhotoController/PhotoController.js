import React from "react";

import PhotoControls from "../../components/Photo/PhotoControls/PhotoControls";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import PhotoFrame from "../../components/Photo/PhotoFrame/PhotoFrame";
import classes from "./PhotoController.module.css";

const PhotoController = (props) => {
  // return (
  //   <div id="PhotoController">
  //     <PhotoFrame photo={props.photo} />
  //     <PhotoControls
  //       photoUpdated={props.photoUpdated}
  //       classifyPhoto={props.classifyPhoto}
  //       classifyButtonActive={props.classifyButtonActive}
  //     />
  //   </div>
  // );
  return (
    <div className={classes.PhotoController}>
      <div className={classes.heading}>Your Photo</div>
      <PhotoFrame />
      <StyledButton>
        <strong>Select Image (JPG)</strong>
      </StyledButton>
      <StyledButton>
        <strong>Classify Breed</strong>
      </StyledButton>
    </div>
  );
};

export default PhotoController;
