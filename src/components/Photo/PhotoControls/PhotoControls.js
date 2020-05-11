import React, { Component } from "react";

import classes from "./PhotoControls.module.css";

// TODO: upload from camera, upload from URL

class PhotoControls extends Component {
  state = {
    showFileExtensionAlert: false,
  };

  fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    if (file.type === "image/jpeg") {
      this.props.photoUpdated(file);
      this.setState({ showFileExtensionAlert: false });
    } else {
      this.setState({ showFileExtensionAlert: true });
    }
  };

  render() {
    let fileExtensionAlert = null;
    if (this.state.showFileExtensionAlert) {
      fileExtensionAlert = (
        <p>
          Error: Image must have .jpg or .jpeg extension. Please choose a
          different image.
        </p>
      );
    }

    return (
      <div className={classes.PhotoControls}>
        <div>
          <label htmlFor="image_upload" className={classes.button}>
            Select image from device (JPG)
          </label>
          <input
            style={{ opacity: 0 }}
            id="image_upload"
            type="file"
            accept="image/jpeg"
            onChange={this.fileSelectedHandler}
          />
        </div>
        {fileExtensionAlert}
        <button className={classes.button}>Classify Image!</button>
      </div>
    );
  }
}

export default PhotoControls;
