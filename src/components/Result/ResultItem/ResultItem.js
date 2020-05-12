import React from "react";

const ResultItem = (props) => {
  return (
    <div>
      <img src="/dog_image_placeholder.png" alt="dog result" />
      <div>
        <p>{props.breed}</p>
        <p>{(parseFloat(props.probability) * 100).toFixed(2) + "%"}</p>
      </div>
    </div>
  );
};

export default ResultItem;
