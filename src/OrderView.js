import React from "react";

import OrderGrid from "./OrderGrid.js";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";

import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { delivered: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ delivered: !this.state.delivered });
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={this.props.classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => this.props.handleViewChange("login")}
            >
              <ExitToAppIcon />
            </IconButton>
            <Typography variant="h6" className={this.props.classes.title}>
              Ordini da consegnare
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.delivered}
                  onChange={this.handleChange}
                  name="delivered"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Consegnati"
            />
          </Toolbar>
        </AppBar>
        <OrderGrid delivered={this.state.delivered} {...this.props} />
      </div>
    );
  }
}

export default OrderView;
