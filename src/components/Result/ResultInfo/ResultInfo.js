import React from "react";

import PhotoFrame from "../../UI/PhotoFrame/PhotoFrame";

import StyledButton from "../../UI/StyledButton/StyledButton";

import "../../../App.css";
import classes from "./ResultInfo.module.css";

const ResultInfo = (props) => {
  // return (
  //   <div>
  //     <PhotoFrame photo={props.photo} />
  //     <DogInfo />
  //   </div>
  // );
  return (
    <div className={["container", classes.ResultInfo].join(" ")}>
      <div className="heading">Closest Match</div>
      <PhotoFrame />
      <div className={classes.matchSummary}>
        <div>
          <p className={classes.matchSummary__breed}>
            <strong>Yorkshire Terrier</strong>
          </p>
          <p className={classes.matchSummary__percentage}>99% Match</p>
        </div>
        <div>
          <p className={classes.matchSummary__rank}>#1</p>
        </div>
      </div>
      <StyledButton>
        <strong>Breed Info</strong>
      </StyledButton>
    </div>
  );
};

export default ResultInfo;
