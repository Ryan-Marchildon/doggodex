import React from "react";

import PhotoFrame from "../../Photo/PhotoFrame/PhotoFrame";
import DogInfo from "../DogInfo/DogInfo";

import StyledButton from "../../UI/StyledButton/StyledButton";

import classes from "./ResultInfo.module.css";

const ResultInfo = (props) => {
  // return (
  //   <div>
  //     <PhotoFrame photo={props.photo} />
  //     <DogInfo />
  //   </div>
  // );
  return (
    <div className={classes.ResultInfo}>
      <div className={classes.heading}>Closest Match</div>
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
