import React from "react";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import LocalBarIcon from "@material-ui/icons/LocalBar";
import CloseIcon from "@material-ui/icons/Close";

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={this.props.classes.loginDiv}
        >
          <Paper className={this.props.classes.loginPaper}>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="center"
              className={this.props.classes.loginPaperGrid}
            >
              <h2>Bentornato, volontario❤️</h2>
              <TextField
                id="standard-basic"
                label="Username"
                name="username"
                style={{ width: "80%" }}
                onChange={this.props.handleTextFieldChange}
              />
              <TextField
                id="standard-basic"
                label="Password"
                name="password"
                type="password"
                style={{ width: "80%" }}
                onChange={this.props.handleTextFieldChange}
              />
              <Button
                variant="contained"
                color="secondary"
                className={this.props.classes.button}
                onClick={this.props.handleLoginRequest}
                startIcon={<LocalBarIcon />}
              >
                'NNAMO
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <div className={this.props.classes.copyrightDiv}>
          ✨This project is open source! Star it on GitHub:
          <a href="https://github.com/montali/QuickBiretta/">
            montali/QuickBiretta
          </a>
          ✨{" "}
        </div>
      </div>
    );
  }
}

export default LoginView;
