import React from "react";

import ResultItem from "../ResultItem/ResultItem";
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
      <div className={classes.heading}>Top 5 Matches</div>
      <ResultItem />
      <ResultItem />
      <ResultItem />
      <ResultItem />
      <ResultItem />
    </div>
  );
};

export default ResultsList;
