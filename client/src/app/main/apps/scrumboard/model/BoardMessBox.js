import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  //Divider,
} from "@material-ui/core";
import React from "react";

function BoardMessBox(props) {
  const { children, open, close, title, content, onYes, onNo, yes, no } = props;

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {/* <Divider /> */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children ? children : content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onYes();
          }}
          color="primary"
        >
          {yes}
        </Button>
        <Button
          onClick={() => {
            onNo();
          }}
          color="secondary"
          autoFocus
        >
          {no}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BoardMessBox;
