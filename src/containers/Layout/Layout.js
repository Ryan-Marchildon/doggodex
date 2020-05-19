import React, { Component } from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import WireFrame from "../../components/WireFrame/WireFrame";
import classes from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <WireFrame />
        {/* <main className={classes.Content}>{this.props.children}</main> */}
      </React.Fragment>
    );
  }
}

export default Layout;
