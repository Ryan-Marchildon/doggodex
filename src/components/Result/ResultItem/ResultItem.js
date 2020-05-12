import React from "react";

import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  return (
    <div className={classes.ResultItem}>
      <img
        className={classes.image}
        src="/dog_image_placeholder.png"
        alt="dog result"
      />
      <div className={classes.details}>
        <p>
          <strong>{props.breed}</strong>
        </p>
        <p>{(parseFloat(props.probability) * 100).toFixed(2) + "%"}</p>
      </div>
    </div>
  );
};

export default ResultItem;
