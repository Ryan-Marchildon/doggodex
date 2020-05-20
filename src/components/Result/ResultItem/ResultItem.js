import React from "react";

import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  return (
    <button className={classes.ResultItem}>
      <div className={classes.ResultItem__details}>
        <p className={classes.ResultItem__details__rank}>1.</p>
        <img
          className={classes.ResultItem__details__photo}
          src="/golden_retriever_2.jpg"
          alt="your cute puppy here!"
        />
        <div className={classes.ResultItem__details__match}>
          <p className={classes.ResultItem__details__match__breed}>
            <strong>Yorkshire Terrier</strong>
          </p>
          <p className={classes.ResultItem__details__match__percentage}>99%</p>
        </div>
      </div>
      <div className={classes.ResultItem__trophy}>Trophy</div>
    </button>
  );
  // return (
  //   <div className={classes.ResultItem}>
  //     <img
  //       className={classes.image}
  //       src="/dog_image_placeholder.png"
  //       alt="dog result"
  //     />
  //     <div className={classes.details}>
  //       <p>
  //         <strong>{props.breed}</strong>
  //       </p>
  //       <p>{(parseFloat(props.probability) * 100).toFixed(2) + "%"}</p>
  //     </div>
  //   </div>
  // );
};

export default ResultItem;
