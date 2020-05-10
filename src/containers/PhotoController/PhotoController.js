import React from "react";

import PhotoControls from "../../components/Photo/PhotoControls/PhotoControls";
import PhotoFrame from "../../components/Photo/PhotoFrame/PhotoFrame";

const PhotoController = (props) => {
  return (
    <div id="PhotoController">
      <PhotoFrame photo={props.photo} />
      <PhotoControls photoUpdated={props.photoUpdated} />
    </div>
  );
};

export default PhotoController;
