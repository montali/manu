import React from "react";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={{ marginTop: "20px" }}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item m={6} style={{ width: "50%" }}>
            {" "}
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <h5 style={{ marginBottom: "10px", marginTop: "10px" }}>
                ID TAVOLO
              </h5>
              <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
                {this.props.tableID}
              </h2>
            </Grid>
          </Grid>

          <Grid item m={6} style={{ width: "50%" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <h5 style={{ marginBottom: "10px", marginTop: "10px" }}>
                PASSWORD
              </h5>
              <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
                {this.props.password}
              </h2>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Order;
