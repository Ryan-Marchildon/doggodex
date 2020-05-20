import React from "react";

import ResultItem from "../ResultItem/ResultItem";

import "../../../App.css";
import classes from "./ResultsList.module.css";

const ResultsList = (props) => {
  // let results = "[Results List]";
  // if (props.results) {
  //   results = props.results.map((result) => {
  //     return (
  //       <ResultItem
  //         key={"result-" + result["breed"]}
  //         breed={result["breed"]}
  //         probability={result["prob"]}
  //       />
  //     );
  //   });
  // }

  return (
    <div className={classes.ResultsList}>
      <div className="heading">Top 5 Matches</div>
      <ResultItem />
      <ResultItem />
      <ResultItem />
      <ResultItem />
      <ResultItem />
    </div>
  );
};

export default ResultsList;
