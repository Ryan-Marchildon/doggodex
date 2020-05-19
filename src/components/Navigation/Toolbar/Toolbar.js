import React from "react";

import classes from "./Toolbar.module.css";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <img className={classes.logo} src="/doggodex_logo.png" alt="logo" />
      <header className={classes.header}>DoggoDex</header>
    </div>
  );
};

export default toolbar;
