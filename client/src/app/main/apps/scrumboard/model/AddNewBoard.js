import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 500,
      textAlign: "center",
    },
  },
}));

function AddNewBoard(props) {
  const classes = useStyles(props);
  const { open, onYes, onNo, addNewBoardLog, setAddNewBoardLogValue } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.title} id="alert-dialog-title">
        Add New Board
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Enter Your Board Name:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="nameBoard"
          type="name"
          fullWidth
          onChange={(e) => {
            setAddNewBoardLogValue({
              ...addNewBoardLog,
              value: e.target.value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            onYes();
          }}
          color="primary"
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            onNo();
          }}
          color="secondary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewBoard;
