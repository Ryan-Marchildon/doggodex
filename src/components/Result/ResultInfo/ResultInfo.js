import React from "react";

import PhotoFrame from "../../UI/PhotoFrame/PhotoFrame";
import StyledButton from "../../UI/StyledButton/StyledButton";
import dogBreeds from "../../../assets/dog_breeds.json";

import "../../../App.css";
import classes from "./ResultInfo.module.css";

const ResultInfo = (props) => {
  let header = "Selected Match";
  if (props.result.rank === 1) {
    header = "Closest Match";
  }

  const breed = dogBreeds[props.result.breed];

  return (
    <div className={["container", classes.ResultInfo].join(" ")}>
      <div className="heading">{header}</div>
      <PhotoFrame photo={breed.photo_path} />
      <div className={classes.matchSummary}>
        <div>
          <p className={classes.matchSummary__breed}>
            <strong>{breed.name}</strong>
          </p>
          <p className={classes.matchSummary__percentage}>
            {(parseFloat(props.result.prob) * 100).toFixed(2) + "%"} match
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
