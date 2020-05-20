import React from "react";

import classes from "./StyledButton.module.css";

const Button = (props) => {
  let button = (
    <button
      className={classes.Button}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
  if (props.buttonType === "input") {
    button = (
      <React.Fragment>
        <input
          className={classes.input}
          id="image_upload"
          type="file"
          accept="image/jpeg"
          onChange={props.fileSelected}
        />
        <label htmlFor="image_upload" className={classes.Button}>
          {props.children}
        </label>
      </React.Fragment>
    );
  }

  return <React.Fragment>{button}</React.Fragment>;
};

export default Button;
