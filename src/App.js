import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useStyles } from "./styles.js";
import { useTheme } from "@material-ui/core/styles";
import OrderView from "./OrderView";

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
    return <OrderView menu={this.state.menu} {...this.props}></OrderView>;
  }
}

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  return (
    <div className="App">
      <MainApp classes={classes} theme={theme} open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
