import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Select,
  Input,
  Popover,
  FormControl,
  InputAdornment,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 500,
      textAlign: "center",
    },
  },
  paper: {
    display: "flex",
    //justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "rgba(9,30,66,.04)",
    },
    cursor: "pointer",
  },
  iconAddMember: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "rgba(9,30,66,.04)",
    },
  },
  optionMembers: {
    padding: theme.spacing(2),
    fontSize: "15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(9,30,66,.04)",
    },
  },
}));

function AddNewBoard(props) {
  const classes = useStyles(props);
  const { open, onYes, onNo, addNewBoardLog, setAddNewBoardLogValue } = props;

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFriend, setSearchFriend] = useState("");
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    if (searchFriend === "") {
      setFriendList([...names]);
    } else {
      const results = names.filter((name) =>
        name.toLowerCase().includes(searchFriend.toLowerCase())
      );
      setFriendList(results);
    }
  }, [searchFriend]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (memberToDelete) => () => {
    const memberFilter = addNewBoardLog.members.filter(
      (member) => member !== memberToDelete
    );
    setAddNewBoardLogValue({
      ...addNewBoardLog,
      members: [...memberFilter],
    });
  };
  const addMember = (e) => {
    setAddNewBoardLogValue({
      ...addNewBoardLog,
      members: [...addNewBoardLog.members, e.target.value],
    });
  };
  const searchMember = () => {};

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
        {/* <Paper component="ul" className={classes.paper}> */}
        <div className="flex">
          <Chip
            avatar={
              <Avatar className={classes.iconAddMember}>
                <Icon style={{ color: "#172b4d" }}>group_add</Icon>
              </Avatar>
            }
            label="Add Member"
            className={classes.chip}
            style={{ color: "#172b4d", marginTop: "20px" }}
            onClick={handleClick}
          />
          {addNewBoardLog.members.map((data, index) => {
            return (
              <Chip
                label={data}
                key={index}
                avatar={<Avatar className={classes.iconAddMember}>M</Avatar>} //{<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                onDelete={handleDelete(data)}
                style={{ color: "#172b4d", marginTop: "20px" }}
                className={classes.chip}
              />
            );
          })}
        </div>
        {/* </Paper> */}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            onYes();
          }}
          style={{ color: "#1976D2" }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            onNo();
          }}
          style={{ color: "red" }}
        >
          Cancel
        </Button>
      </DialogActions>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "25ch",
          },
        }}
      >
        <FormControl className={classes.optionMembers}>
          <Input
            id="standard-adornment-weight"
            //value={values.weight}
            placeholder="Search Friend"
            onChange={(e) => {
              setSearchFriend(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <Icon style={{ color: "#172b4d" }}>search</Icon>
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
          />
        </FormControl>
        {friendList.map((name) => {
          return (
            <option
              className={classes.optionMembers}
              onClick={(e) => {
                addMember(e);
              }}
            >
              {name}
            </option>
          );
        })}
      </Menu>
    </Dialog>
  );
}

export default AddNewBoard;
