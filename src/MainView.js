import React from "react";
import clsx from "clsx";
import axios from "axios";

import OrderGrid from "./OrderGrid.js";
import TableGrid from "./TableGrid.js";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import RefreshIcon from "@material-ui/icons/Refresh";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { delivered: false, view: "orders", tablesNo: 0, tables: [] };
    this.handleChange = this.handleChange.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getTables = this.getTables.bind(this);
    this.handleTablesRefresh = this.handleTablesRefresh.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.getTables();
  }

  handleChange() {
    this.setState({ delivered: !this.state.delivered });
  }

  handleTextFieldChange(event) {
    const target = event.target;
    const name = target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  getTables() {
    axios
      .get("/api/gettables")
      .then((res) => {
        let tables = {};
        for (const item in res.data) {
          tables[res.data[item].name] = res.data[item];
        }
        this.setState({
          tables: tables,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleTablesRefresh() {
    this.props.handleDialogClose();
    axios
      .post("/api/refreshtables", { tablesNo: parseInt(this.state.tablesNo) })
      .then((res) => {
        this.getTables();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeView(view) {
    this.setState({ view: view });
    this.props.handleDrawerClose();
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerOpen}
              edge="start"
              className={clsx(
                this.props.classes.menuButton,
                this.props.drawerOpen && this.props.classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={this.props.classes.title}>
              {this.state.delivered &&
                this.state.view === "orders" &&
                "Ordini consegnati"}
              {!this.state.delivered &&
                this.state.view === "orders" &&
                "Ordini da consegnare"}
              {this.state.view === "tables" && "Tavoli"}
            </Typography>

            {this.state.view === "orders" && (
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
            )}
            {this.state.view === "tables" && (
              <Button
                variant="contained"
                color="secondary"
                className={this.props.classes.button}
                startIcon={<RefreshIcon />}
                onClick={this.props.handleDialogOpen}
              >
                RESET
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={this.props.classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.drawerOpen}
          classes={{
            paper: this.props.classes.drawerPaper,
          }}
        >
          <div className={this.props.classes.drawerHeader}>
            <IconButton onClick={this.props.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuItem
            button
            key={"Ordini"}
            selected={this.state.view === "orders"}
            onClick={() => {
              this.changeView("orders");
            }}
          >
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary={"Ordini"} />
          </MenuItem>
          <MenuItem
            button
            key={"Tavoli"}
            selected={this.state.view === "tables"}
            onClick={() => {
              this.changeView("tables");
            }}
          >
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Tavoli"} />
          </MenuItem>
        </Drawer>
        <Dialog
          open={this.props.dialogOpen}
          onClose={this.props.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            RINFRESCAZZIONAMENTO DEI TAVOLI
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Stai per resettare tutti i tavoli. In questo modo, i
              malintenzionati non possono farti scherzetti. Smart move, bravo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="tablesNo"
              name="tablesNo"
              label="Inserisci il numero di tavoli"
              type="number"
              fullWidth
              onChange={this.handleTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleDialogClose} color="primary">
              Annulla
            </Button>
            <Button onClick={this.handleTablesRefresh} color="primary">
              Conferma
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.view == "orders" && (
          <OrderGrid delivered={this.state.delivered} {...this.props} />
        )}
        {this.state.view == "tables" && (
          <TableGrid
            tablesNo={this.state.tablesNo}
            tables={this.state.tables}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export default MainView;
