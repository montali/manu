import React from "react";

import axios from "axios";
import _ from "lodash";

import Order from "./Order.js";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

class OrderGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], lastOrder: null };
    this.updateAllOrders = this.updateAllOrders.bind(this);
    this.checkForNewOrders = this.checkForNewOrders.bind(this);
  }

  updateAllOrders() {
    let endpoint = "/api/getorders";
    if (this.props.delivered == true) {
      endpoint += "?delivered=true";
    }
    axios
      .get(endpoint)
      .then((res) => {
        let orders = [];
        for (const item in res.data) {
          orders.push(res.data[item]);
        }
        this.setState({
          orders: orders,
          lastOrder: orders[orders.length - 1],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkForNewOrders() {
    let endpoint = "/api/getlastorder";
    axios
      .get(endpoint)
      .then((res) => {
        if (!_.isEqual(res.data[0], this.state.lastOrder)) {
          this.updateAllOrders();
          console.log("Checked for new orders");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    //this.updateAllOrders();
    this.checkForNewOrders();
    let ordersComponents = [];
    for (const item in this.state.orders) {
      ordersComponents.push(
        <Grid
          item
          xs={10}
          m={10}
          width={1}
          className={this.props.classes.fullWidthGridItem}
        >
          <Order
            key={item}
            index={item}
            username={this.state.orders[item].username}
            items={this.state.orders[item].items}
            notes={this.state.orders[item].notes}
            tableID={this.state.orders[item].table}
            time={this.state.orders[item].time}
            {...this.props}
          ></Order>
        </Grid>
      );
    }
    if (ordersComponents.length === 0) {
      ordersComponents.push(<body>Non sembra esserci niente qui 😔</body>);
    }
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <h2 className={this.props.classes.orderCheckTypography}>
          Note dell'ordine
        </h2>
        <body>
          Ricorda di inserire qui eventuali scelte di cocktail e panini🌯
        </body>
        <TextField
          id="standard-multiline-flexible"
          label="Inserisci qui le note"
          multiline
          rowsMax={10}
          name="orderNotes"
          onChange={this.props.handleTextFieldChange}
          className={this.props.classes.orderNotesTextbox}
        />
        <h2 className={this.props.classes.orderCheckTypography}>
          Contenuto dell'ordine
        </h2>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          {ordersComponents}
        </Grid>
      </Grid>
    );
  }
}

export default OrderGrid;
