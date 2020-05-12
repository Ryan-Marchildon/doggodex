import React from "react";

import ResultItem from "../ResultItem/ResultItem";
import classes from "./ResultsList.module.css";

const ResultsList = (props) => {
  let results = "[Results]";
  if (props.results) {
    results = props.results.map((result) => {
      return (
        <ResultItem
          key={"result-" + result["breed"]}
          breed={result["breed"]}
          probability={result["prob"]}
        />
      );
    });
  }

  return <div className={classes.ResultsList}>{results}</div>;
};

export default ResultsList;
