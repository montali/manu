import React from "react";
import clsx from "clsx";
import axios from "axios";

import OrderGrid from "./OrderGrid.js";
import TableGrid from "./TableGrid.js";
import TablesDialog from "./TablesDialog.js";
import MenuGrid from "./MenuGrid.js";
import MenuDialog from "./MenuDialog.js";

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
import MenuBookIcon from "@material-ui/icons/MenuBook";
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
    this.state = {
      delivered: false,
      view: "orders",
      tablesNo: 0,
      tables: [],
      menu: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getTables = this.getTables.bind(this);
    this.updateMenu = this.updateMenu.bind(this);

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
    console.log("delete" + id);
  }

  updateMenuItem(item) {
    console.log(item);
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
        </Drawer>

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
              handleTextFieldChange={this.handleTextFieldChange}
              handleTablesRefresh={this.handleTablesRefresh}
              {...this.props}
            />
            <MenuGrid menu={this.state.menu} {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default MainView;
