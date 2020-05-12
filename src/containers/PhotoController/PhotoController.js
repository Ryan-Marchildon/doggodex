import React from "react";

import PhotoControls from "../../components/Photo/PhotoControls/PhotoControls";
import PhotoFrame from "../../components/Photo/PhotoFrame/PhotoFrame";

const PhotoController = (props) => {
  return (
    <div id="PhotoController">
      <PhotoFrame photo={props.photo} />
      <PhotoControls
        photoUpdated={props.photoUpdated}
        classifyPhoto={props.classifyPhoto}
        classifyButtonActive={props.classifyButtonActive}
      />
    </div>
  );
};

export default PhotoController;
