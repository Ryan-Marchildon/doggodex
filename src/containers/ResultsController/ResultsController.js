import React from "react";

import ResultsList from "../../components/Result/ResultsList/ResultsList";
import ResultInfo from "../../components/Result/ResultInfo/ResultInfo";
import classes from "./ResultsController.module.css";

const ResultsController = (props) => {
  return (
    <div id="ResultsController" className={classes.ResultsController}>
      <ResultInfo photo={props.photo} />
      <ResultsList results={props.results} />
    </div>
  );
};

export default ResultsController;
