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

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Fetch menu data from ids
    let itemsData = [];
    let totalPrice = 0.0;

    for (const item in this.props.items) {
      if (this.props.items[item] in this.props.menu) {
        let menuItem = this.props.menu[this.props.items[item]];

        itemsData.push({
          key: item,
          name: menuItem.name,
        });
        totalPrice += menuItem.price;
      }
    }

    return (
      <Paper>
        <div style={{ margin: "10px" }}>
          <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
            Tavolo {this.props.tableID} - {this.props.username}
          </h2>
          Ordine inoltrato alle {this.props.time}
          <br />
          Note:{this.props.notes}
        </div>
        {itemsData.map((data) => {
          return (
            <li key={data.key} className={this.props.classes.chipList}>
              <Chip label={data.name} className={this.props.classes.chip} />
            </li>
          );
        })}

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {" "}
          <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
            €{totalPrice.toFixed(2)}
          </h2>
          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            startIcon={<SentimentVerySatisfiedIcon />}
            onClick={() => this.props.handleDelivery(this.props.uuid)}
          >
            CONSEGNA
          </Button>
        </Grid>
      </Paper>
    );
  }
}

export default Order;
