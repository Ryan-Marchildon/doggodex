import React from "react";

import dogBreeds from "../../../assets/dog_breeds.json";
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  const result = {
    rank: props.rank,
    breed: props.breed,
    probability: props.probability,
  };
  const breed = dogBreeds[props.breed];

  let trophy = null;
  if (props.rank === 1) {
    trophy = (
      <img
        className={classes.ResultItem__trophy__img}
        src="/trophy_icon.png"
        alt="winner"
      ></img>
    );
  }

  const buttonStyling = [classes.ResultItem];
  if (props.selected) {
    buttonStyling.push(classes.active);
  }

  return (
    <button
      className={buttonStyling.join(" ")}
      onClick={props.clicked.bind(this, result)}
    >
      <div className={classes.ResultItem__details}>
        <p className={classes.ResultItem__details__rank}>{props.rank}.</p>
        <img
          className={classes.ResultItem__details__photo}
          src={breed.photo_path}
          alt="result"
        />
        <div className={classes.ResultItem__details__match}>
          <p className={classes.ResultItem__details__match__breed}>
            <strong>{breed.name}</strong>
          </p>
          <p className={classes.ResultItem__details__match__percentage}>
            {(parseFloat(props.probability) * 100).toFixed(2) + "%"}
          </p>
        </div>
      </div>
      <div className={classes.ResultItem__trophy}>{trophy}</div>
    </button>
  );
};

export default ResultItem;
