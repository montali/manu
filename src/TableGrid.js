import React from "react";

import axios from "axios";

import Table from "./Table.js";

import ReactInterval from "react-interval";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

class TableGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tableComponents = [];
    for (const item in this.props.tables) {
      tableComponents.push(
        <Grid
          item
          xs={6}
          m={6}
          width={1}
          className={this.props.classes.fullWidthGridItem}
        >
          <Table
            key={item}
            tableID={this.props.tables[item].name}
            password={this.props.tables[item].password}
            {...this.props}
          ></Table>
        </Grid>
      );
    }
    if (tableComponents.length === 0) {
      tableComponents.push(<body>Carico...</body>);
    }
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {tableComponents}
      </Grid>
    );
  }
}

export default TableGrid;
