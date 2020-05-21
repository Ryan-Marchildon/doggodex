import React from "react";

import dogBreeds from "../../../assets/dog_breeds.json";
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
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

  const breed = dogBreeds[props.breed];

  return (
    <button className={classes.ResultItem}>
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
