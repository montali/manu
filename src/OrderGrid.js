import React from "react";

import axios from "axios";

import Order from "./Order.js";

import ReactInterval from "react-interval";

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
    this.state = { orders: {}, deliveredOrders: {} };
    this.updateAllOrders = this.updateAllOrders.bind(this);
    this.checkForNewOrders = this.checkForNewOrders.bind(this);
    this.handleDelivery = this.handleDelivery.bind(this);
  }

  handleDelivery(id) {
    axios
      .post("/api/deliverorder", { uuid: id })
      .then((res) => {
        let deliveredOrders = this.state.deliveredOrders;
        let orders = this.state.orders;
        deliveredOrders[id] = this.state.orders[id];
        delete orders[id];
        this.setState({
          orders: orders,
          deliveredOrders: deliveredOrders,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateAllOrders() {
    axios
      .get("/api/getorders?missing=1")
      .then((res) => {
        let orders = {};
        for (const item in res.data) {
          orders[res.data[item].uuid] = res.data[item];
        }
        this.setState({
          orders: orders,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/getorders?delivered=1")
      .then((res) => {
        let orders = {};
        for (const item in res.data) {
          orders[res.data[item].uuid] = res.data[item];
        }
        this.setState({
          deliveredOrders: orders,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillMount() {
    this.updateAllOrders();
  }
  /*   componentWillReceiveProps(newProps) {
    if (newProps.delivered !== this.props.delivered) this.updateAllOrders();
  } */
  checkForNewOrders() {
    let endpoint = "/api/getlastorder";
    var oldOrders = this.state.orders;
    axios
      .get(endpoint)
      .then((res) => {
        if (!(res.data[0].uuid in oldOrders)) {
          this.updateAllOrders();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    this.checkForNewOrders();

    let ordersComponents = [];
    let orders = {};
    if (this.props.delivered) orders = this.state.deliveredOrders;
    else orders = this.state.orders;
    for (const item in orders) {
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
            username={orders[item].username}
            items={orders[item].items}
            notes={orders[item].notes}
            uuid={orders[item].uuid}
            tableID={orders[item].table}
            time={orders[item].time}
            handleDelivery={this.handleDelivery}
            {...this.props}
          ></Order>
        </Grid>
      );
    }
    if (ordersComponents.length === 0) {
      ordersComponents.push(<body>Carico...</body>);
    }
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {ordersComponents}
        <ReactInterval
          timeout={1000}
          enabled={true}
          callback={() => {
            this.checkForNewOrders();
          }}
        />
      </Grid>
    );
  }
}

export default OrderGrid;
