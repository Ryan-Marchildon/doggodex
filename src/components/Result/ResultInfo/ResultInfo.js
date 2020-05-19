import React from "react";

import PhotoFrame from "../../Photo/PhotoFrame/PhotoFrame";
import DogInfo from "../DogInfo/DogInfo";

const ResultInfo = (props) => {
  return (
    <div>
      <PhotoFrame photo={props.photo} />
      <DogInfo />
    </div>
  );
};

export default ResultInfo;
