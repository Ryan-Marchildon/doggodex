import React from "react";

import classes from "./PhotoFrame.module.css";

const PhotoFrame = (props) => {
  let photo = "url('/dog_image_placeholder.png')";
  if (props.photo !== null) {
    photo = "url(" + props.photo + ")";
  }

  return (
    <div
      className={classes.PhotoFrame}
      style={{ backgroundImage: photo }}
    ></div>
  );
};

export default PhotoFrame;
