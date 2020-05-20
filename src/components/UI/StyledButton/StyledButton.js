import React from "react";

import classes from "./StyledButton.module.css";

const Button = (props) => {
  return <button className={classes.Button}>{props.children}</button>;
};

export default Button;
