import React from "react";

import PhotoFrame from "../../UI/PhotoFrame/PhotoFrame";

import StyledButton from "../../UI/StyledButton/StyledButton";

import "../../../App.css";
import classes from "./ResultInfo.module.css";

// rank: 1,
// breed: rankedResults[0].breed,
// prob: rankedResults[0].prob,

const ResultInfo = (props) => {
  let header = "Selected Match";
  if (props.result.rank === 1) {
    header = "Closest Match";
  }

  return (
    <div className={["container", classes.ResultInfo].join(" ")}>
      <div className="heading">{header}</div>
      <PhotoFrame />
      <div className={classes.matchSummary}>
        <div>
          <p className={classes.matchSummary__breed}>
            <strong>{props.result.breed}</strong>
          </p>
          <p className={classes.matchSummary__percentage}>
            {(parseFloat(props.result.prob) * 100).toFixed(2) + "%"} Match
          </p>
        </div>
        <div>
          <p className={classes.matchSummary__rank}>#{props.result.rank}</p>
        </div>
      </div>
      <StyledButton>
        <strong>Breed Info</strong>
      </StyledButton>
    </div>
  );
};

export default ResultInfo;
