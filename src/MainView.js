import React from "react";
import clsx from "clsx";
import axios from "axios";

import OrderGrid from "./OrderGrid.js";
import TableGrid from "./TableGrid.js";
import TablesDialog from "./TablesDialog.js";
import MenuGrid from "./MenuGrid.js";
import MenuDialog from "./MenuDialog.js";
import LoginView from "./LoginView.js";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import RefreshIcon from "@material-ui/icons/Refresh";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.uniqid = require("uniqid");
    this.state = {
      delivered: false,
      view: "login",
      tablesNo: 0,
      tables: [],
      menu: [],
      editingMenuItem: { name: "", desc: "", price: 0, id: this.uniqid() },
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.getTables = this.getTables.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);

    this.openEditDialog = this.openEditDialog.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.handleMenuItemTextFieldChange = this.handleMenuItemTextFieldChange.bind(
      this
    );
    this.handleTablesRefresh = this.handleTablesRefresh.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.getTables();
    this.updateMenu();
  }

  handleChange() {
    this.setState({ delivered: !this.state.delivered });
  }
  updateMenu() {
    axios
      .get("/api/getmenu")
      .then((res) => {
        let menuDict = {};
        for (const item in res.data) {
          menuDict[res.data[item].id] = res.data[item];
        }
        this.setState({ menu: menuDict });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteMenuItem(id) {
    axios
      .post("/api/deletemenu", {
        username: this.state.username,
        password: this.state.password,
        id: id,
      })
      .then((res) => {
        let menuDict = this.state.menu;
        delete menuDict[id];
        this.setState({ menu: menuDict });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleLoginRequest() {
    axios
      .post("/api/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        this.changeView("orders");
        this.setState({ snackbarMessage: "Benvenuto!" });
        this.props.setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          snackbarMessage: "Dati errati! Ricontrolla per favore",
        });
        this.props.setOpen(true);
      });
  }

  updateMenuItem() {
    // Numbers get returned as strings. Let's fix that
    let item = this.state.editingMenuItem;
    item.price = parseFloat(item.price);
    // POST request with this.state.editingMenuItem
    axios
      .post("/api/savemenu", {
        username: this.state.username,
        password: this.state.password,
        item: this.state.editingMenuItem,
      })
      .then((res) => {
        let menuDict = this.state.menu;
        menuDict[this.state.editingMenuItem.id] = this.state.editingMenuItem;
        this.setState({ menu: menuDict, editingMenuItem: {} });
        this.props.handleDialogClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  addMenuItem() {
    this.openEditDialog({ name: "", desc: "", price: 0, id: this.uniqid() });
  }

  handleLogout() {
    this.setState({ username: "", password: "" });
    this.changeView("login");
  }

  handleTextFieldChange(event) {
    const target = event.target;
    const name = target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  handleMenuItemTextFieldChange(event) {
    const target = event.target;
    const name = target.name;
    const value = event.target.value;
    let editingMenuItem = this.state.editingMenuItem;
    editingMenuItem[name] = value;
    this.setState({ editingMenuItem: editingMenuItem });
    console.log(editingMenuItem);
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
  openEditDialog(menuItem) {
    this.setState({ editingMenuItem: menuItem });
    this.props.handleDialogOpen();
  }

  changeView(view) {
    this.setState({ view: view });
    this.props.handleDrawerClose();
  }

  render() {
    return (
      <div>
        {this.state.view !== "login" && (
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
                {this.state.view === "menu" && "Modifica menù"}
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
              {this.state.view === "menu" && (
                <Button
                  variant="contained"
                  color="secondary"
                  className={this.props.classes.button}
                  startIcon={<AddIcon />}
                  onClick={this.addMenuItem}
                >
                  AGGIUNGI
                </Button>
              )}
            </Toolbar>
          </AppBar>
        )}

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
          <MenuItem
            button
            key={"Menù"}
            selected={this.state.view === "menu"}
            onClick={() => {
              this.changeView("menu");
            }}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={"Menù"} />
          </MenuItem>
          <Divider />
          <MenuItem button key={"Esci"} onClick={this.handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Esci"} />
          </MenuItem>
        </Drawer>
        <Snackbar
          open={this.props.open}
          autoHideDuration={4000}
          onClose={() => {
            this.props.setOpen(false);
          }}
          message={this.state.snackbarMessage}
        />
        {this.state.view == "orders" && (
          <OrderGrid
            delivered={this.state.delivered}
            menu={this.state.menu}
            {...this.props}
          />
        )}
        {this.state.view == "tables" && (
          <div>
            <TablesDialog
              handleTextFieldChange={this.handleTextFieldChange}
              handleTablesRefresh={this.handleTablesRefresh}
              {...this.props}
            />
            <TableGrid
              tablesNo={this.state.tablesNo}
              tables={this.state.tables}
              {...this.props}
            />
          </div>
        )}
        {this.state.view == "menu" && (
          <div>
            <MenuDialog
              handleMenuItemTextFieldChange={this.handleMenuItemTextFieldChange}
              updateMenuItem={this.updateMenuItem}
              item={this.state.editingMenuItem}
              {...this.props}
            />
            <MenuGrid
              menu={this.state.menu}
              deleteMenuItem={this.deleteMenuItem}
              openEditDialog={this.openEditDialog}
              {...this.props}
            />
          </div>
        )}
        {this.state.view == "login" && (
          <LoginView
            handleTextFieldChange={this.handleTextFieldChange}
            handleLoginRequest={this.handleLoginRequest}
            {...this.props}
          ></LoginView>
        )}
      </div>
    );
  }
}

export default MainView;
