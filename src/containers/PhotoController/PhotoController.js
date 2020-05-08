import React from "react";

import PhotoControls from "../../components/Photo/PhotoControls/PhotoControls";
import PhotoFrame from "../../components/Photo/PhotoFrame/PhotoFrame";

const PhotoController = (props) => {
  return (
    <div id="PhotoController">
      <PhotoFrame />
      <PhotoControls />
    </div>
  );
};

export default PhotoController;
