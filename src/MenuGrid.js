import React from "react";

import axios from "axios";

import MenuItem from "./MenuItem.js";

import ReactInterval from "react-interval";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

class MenuGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let menuComponents = [];
    for (const item in this.props.menu) {
      menuComponents.push(
        <Grid
          item
          xs={6}
          m={6}
          width={1}
          className={this.props.classes.fullWidthGridItem}
        >
          <MenuItem
            name={this.props.menu[item].name}
            desc={this.props.menu[item].desc}
            price={this.props.menu[item].price}
            id={this.props.menu[item].id}
            {...this.props}
          ></MenuItem>
        </Grid>
      );
    }
    if (menuComponents.length === 0) {
      menuComponents.push(<body>Carico...</body>);
    }
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {menuComponents}
      </Grid>
    );
  }
}

export default MenuGrid;
