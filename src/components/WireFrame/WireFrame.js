import React from "react";

import classes from "./WireFrame.module.css";
import btnClasses from "./ButtonClass.module.css";
import ResultItemWF from "./SubWireFrames/ResultItemWF";

const WireFrame = (props) => {
  return (
    <div className={classes.WireFrame}>
      <div className={classes.PhotoController}>
        <div>
          <div className={classes.heading}>Your Photo</div>
          <img src="/dog_image_placeholder.png" alt="your cute puppy here!" />
        </div>
        <div>
          <button className={[btnClasses.button, classes.widened].join(" ")}>
            <strong>Select Image (JPG)</strong>
          </button>
          <button className={[btnClasses.button, classes.widened].join(" ")}>
            <strong>Classify Breed</strong>
          </button>
        </div>
      </div>
      <div className={classes.ResultsController}>
        <div className={classes.ResultInfo}>
          <div className={classes.heading}>Closest Match</div>
          <img src="/dog_image_placeholder.png" alt="your cute puppy here!" />
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
        <div className={classes.ResultsList}>
          <div>Top 5 Matches</div>
          <ResultItemWF />
          <ResultItemWF />
          <ResultItemWF />
          <ResultItemWF />
          <ResultItemWF />
        </div>
      </div>
    </div>
  );
};

export default WireFrame;
