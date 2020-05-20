import React, { Component } from "react";

import StyledButton from "../../components/UI/StyledButton/StyledButton";
import PhotoFrame from "../../components/UI/PhotoFrame/PhotoFrame";
import classes from "./PhotoController.module.css";

// TODO: upload from camera, upload from URL

class PhotoController extends Component {
  // return (
  //   <div id="PhotoController">
  //     <PhotoFrame photo={props.photo} />
  //     <PhotoControls
  //       photoUpdated={props.photoUpdated}
  //       classifyPhoto={props.classifyPhoto}
  //       classifyButtonActive={props.classifyButtonActive}
  //     />
  //   </div>
  // );

  // state = {
  //   showFileExtensionAlert: false,
  // };

  // fileSelectedHandler = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (file.type === "image/jpeg") {
  //       this.props.photoUpdated(file);
  //       this.setState({ showFileExtensionAlert: false });
  //     } else {
  //       this.setState({ showFileExtensionAlert: true });
  //     }
  //   }
  // };

  // let fileExtensionAlert = null;
  // if (this.state.showFileExtensionAlert) {
  //   fileExtensionAlert = (
  //     <p>
  //       Error: Image must have .jpg or .jpeg extension. Please choose a
  //       different image.
  //     </p>
  //   );
  // }
  // return (
  //   <div className={classes.PhotoControls}>
  //     <div>
  //       <label htmlFor="image_upload" className={classes.button}>
  //         Select image from device (JPG)
  //       </label>
  //       <input
  //         style={{ opacity: 0 }}
  //         id="image_upload"
  //         type="file"
  //         accept="image/jpeg"
  //         onChange={this.fileSelectedHandler}
  //       />
  //     </div>
  //     {fileExtensionAlert}
  //     <button
  //       className={classes.button}
  //       onClick={this.props.classifyPhoto}
  //       disabled={!this.props.classifyButtonActive}
  //     >
  //       Classify Image!
  //     </button>
  //   </div>
  // );

  render() {
    return (
      <div className={classes.PhotoController}>
        <div className={classes.heading}>Your Photo</div>
        <PhotoFrame />
        <StyledButton>
          <strong>Select Image (JPG)</strong>
        </StyledButton>
        <StyledButton>
          <strong>Classify Breed</strong>
        </StyledButton>
      </div>
    );
  }
}

export default PhotoController;
