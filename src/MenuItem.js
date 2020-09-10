import React from "react";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <div style={{ margin: "10px" }}>
          <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
            {this.props.item.name}
          </h2>
          {this.props.item.desc}
          <br />
          <h5>€{this.props.item.price}</h5>
        </div>

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {" "}
          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            startIcon={<SentimentVerySatisfiedIcon />}
            onClick={() => this.props.deleteMenuItem(this.props.item.id)}
            style={{ marginBottom: "10px" }}
          >
            ELIMINA
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            startIcon={<SentimentVerySatisfiedIcon />}
            onClick={() => this.props.openEditDialog(this.props.item)}
            style={{ marginBottom: "10px" }}
          >
            MODIFICA
          </Button>
        </Grid>
      </Paper>
    );
  }
}

export default MenuItem;
