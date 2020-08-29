import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useStyles } from "./styles.js";
import { useTheme } from "@material-ui/core/styles";
import MainView from "./MainView";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu: [] };
    this.updateMenu = this.updateMenu.bind(this);
    this.updateMenu();
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

  render() {
    return <MainView menu={this.state.menu} {...this.props}></MainView>;
  }
}

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const theme = useTheme();
  return (
    <div className="App">
      <MainApp
        classes={classes}
        theme={theme}
        open={open}
        drawerOpen={drawerOpen}
        dialogOpen={dialogOpen}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleDialogOpen={() => {
          setDialogOpen(true);
        }}
        handleDialogClose={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}

export default App;
