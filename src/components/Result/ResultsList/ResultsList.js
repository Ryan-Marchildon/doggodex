import React from "react";

import classes from "./ResultsList.module.css";

const ResultsList = (props) => {
  let results = "[Results]";
  if (props.results) {
    results = props.results.map((result) => {
      return (
        <p key={"result-" + result["breed"]}>
          Breed:{result["breed"]}, Probability:{result["prob"]}
        </p>
      );
    });
  }

  return <div className={classes.ResultsList}>{results}</div>;
};

export default ResultsList;
