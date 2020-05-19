import React from "react";

import classes from "./ResultItemWF.module.css";

const ResultItemWF = (props) => {
  return (
    <button className={classes.ResultItem}>
      <div className={classes.ResultItem__details}>
        <p className={classes.ResultItem__details__rank}>1.</p>
        <img
          className={classes.ResultItem__details__photo}
          src="/golden_retriever_2.jpg"
          alt="your cute puppy here!"
        />
        <div className={classes.ResultItem__details__match}>
          <p className={classes.ResultItem__details__match__breed}>
            <strong>Yorkshire Terrier</strong>
          </p>
          <p className={classes.ResultItem__details__match__percentage}>99%</p>
        </div>
      </div>
      <div className={classes.ResultItem__trophy}>Trophy</div>
    </button>
  );
};

export default ResultItemWF;
