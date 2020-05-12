import React from "react";

import PhotoFrame from "../../components/Photo/PhotoFrame/PhotoFrame";
import ResultsList from "../../components/Result/ResultsList/ResultsList";
import DogInfo from "../../components/Result/DogInfo/DogInfo";

const ResultsController = (props) => {
  return (
    <div id="ResultsController">
      <PhotoFrame photo={props.photo} />
      <ResultsList results={props.results} />
      <DogInfo />
    </div>
  );
};

export default ResultsController;
