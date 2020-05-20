import React from "react";

import classes from "./PhotoFrame.module.css";

const photoFrame = (props) => {
  let photo = (
    <img
      className={classes.image}
      src="/dog_image_placeholder.png"
      alt="your cute puppy here!"
    />
  );
  if (props.photo !== null) {
    photo = (
      <img
        className={classes.image}
        src={props.photo}
        alt="your cute puppy here!"
      />
    );
  }

  // return <div className={classes.PhotoFrame}>{photo}</div>;
  return <div className={classes.PhotoFrame}></div>;
};

export default photoFrame;
