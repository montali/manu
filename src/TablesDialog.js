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

class TablesDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
            Stai per resettare tutti i tavoli. In questo modo, i malintenzionati
            non possono farti scherzetti. Smart move, bravo.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tablesNo"
            name="tablesNo"
            label="Inserisci il numero di tavoli"
            type="number"
            fullWidth
            onChange={this.props.handleTextFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} color="primary">
            Annulla
          </Button>
          <Button onClick={this.props.handleTablesRefresh} color="primary">
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TablesDialog;
