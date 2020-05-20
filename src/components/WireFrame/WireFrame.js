import React from "react";

import classes from "./WireFrame.module.css";
import btnClasses from "./ButtonClass.module.css";
import ResultItemWF from "./SubWireFrames/ResultItemWF";

const WireFrame = (props) => {
  return (
    <div className={classes.DogClassifer}>
      <div className={classes.Main}>
        <div className={classes.PhotoController}>
          <div className={classes.heading}>Your Photo</div>
          <img
            className={classes.image}
            src="/golden_retriever_2.jpg"
            alt="your cute puppy here!"
          />
          <button className={[btnClasses.button, classes.widened].join(" ")}>
            <strong>Select Image (JPG)</strong>
          </button>
          <button className={[btnClasses.button, classes.widened].join(" ")}>
            <strong>Classify Breed</strong>
          </button>
        </div>
        <div className={classes.ResultInfo}>
          <div className={classes.heading}>Closest Match</div>
          <img
            className={classes.image}
            src="/golden_retriever_2.jpg"
            alt="your cute puppy here!"
          />
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
          <button className={[btnClasses.button, classes.widened].join(" ")}>
            <strong>Breed Info</strong>
          </button>
        </div>
        <div className={classes.flexBreak}></div>
        <div className={classes.ResultsList}>
          <div className={classes.heading}>Top 5 Matches</div>
          <ResultItemWF />
          <ResultItemWF />
          <ResultItemWF />
          <ResultItemWF />
          <ResultItemWF />
        </div>
      </div>
      <div className={classes.Reset}>
        <button className={[btnClasses.button, classes.widened].join(" ")}>
          Start Over
        </button>
      </div>
    </div>
  );
};

export default WireFrame;
