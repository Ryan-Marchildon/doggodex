import React from "react";

import ResultItem from "../ResultItem/ResultItem";

import "../../../App.css";
import classes from "./ResultsList.module.css";

const ResultsList = (props) => {
  const selectedResultIndex = props.selectedResult.rank - 1;

  let results = null;
  if (props.results) {
    results = props.results.map((result, index) => {
      return (
        <ResultItem
          key={"result-" + result["breed"]}
          breed={result["breed"]}
          probability={result["prob"]}
          rank={index + 1}
          clicked={props.itemClicked}
          selected={selectedResultIndex === index}
        />
      );
    });
  }

  return (
    <div className={["container", classes.ResultsList].join(" ")}>
      <div className="heading">Top 5 Matches</div>
      {results}
    </div>
  );
};

export default ResultsList;
