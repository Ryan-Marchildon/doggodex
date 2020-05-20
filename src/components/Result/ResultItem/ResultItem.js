import React from "react";

import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  let trophy = null;
  if (props.rank === 1) {
    trophy = "[Trophy]";
  }

  return (
    <button className={classes.ResultItem}>
      <div className={classes.ResultItem__details}>
        <p className={classes.ResultItem__details__rank}>{props.rank}.</p>
        <img
          className={classes.ResultItem__details__photo}
          src="/golden_retriever_2.jpg"
          alt="your cute puppy here!"
        />
        <div className={classes.ResultItem__details__match}>
          <p className={classes.ResultItem__details__match__breed}>
            <strong>{props.breed}</strong>
          </p>
          <p className={classes.ResultItem__details__match__percentage}>
            {(parseFloat(props.probability) * 100).toFixed(2) + "%"}
          </p>
        </div>
      </div>
      <div className={classes.ResultItem__trophy}>{trophy}</div>
    </button>
  );
};

export default ResultItem;
