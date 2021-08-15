import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { FuseChipSelect } from "@fuse";
import ToolbarMenu from "./dialogs/card/toolbar/ToolbarMenu";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { userIsAdmin } from "../store/allBoardFunction";
import { memberDeleteBoard } from "../store/actions";
import BoardMessBox from "../model/BoardMessBox";
//import ToolbarMenu from "./ToolbarMenu";

const useStyles = makeStyles((theme) => ({
  addContainer: {
    textAlign: "right",
    color: "green",
    cursor: "pointer",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  listItem: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  memberAdd: {
    display: "flex",
    //justifyContent: "center",
    //flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    minHeight: "40px",
  },
  optionMembers: {
    width: "100%",
    marginTop: "20px",
    fontSize: "15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(9,30,66,.04)",
    },
  },
}));

function BoardMember(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allUserCollect = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUserCollect
  );
  const allUser = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUser
  );
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  //const profile = useSelector((state) => state.login.findId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [addList, setAddList] = useState([]);
  const [searchFriend, setSearchFriend] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendListBackup, setFriendListBackup] = useState([]);
  const [memberAdded, setMemberAdded] = useState(false);
  const [kickMember, setKickMember] = useState({
    open: false,
    memberName: "",
    memberId: "",
  });

  const getDataForFiendList = () => {
    const userId = localStorage.getItem("user_authenticated");
    const userList = addList.filter(
      (user) => JSON.stringify(user.id) !== userId
    );
    setFriendList([...userList]);
  };
  useEffect(() => {
    getDataForFiendList();
  }, [addList]);

  useEffect(() => {
    let userToAdd = [];
    // console.log("allUserCollect: ", allUserCollect);
    // console.log("allUser: ", allUser);
    const userNotMember = allUser.filter(
      (user) =>
        !allUserCollect.find(
          ({ id, status }) => user.id === id && status === "Stay"
        )
    );
    // console.log("allUserCollect: ", allUserCollect);
    // console.log("userNotMember: ", userNotMember);
    userNotMember.map((user) => {
      userToAdd.push({ ...user, add: false });
    });
    setAddList(userToAdd);
  }, [allUser, allUserCollect]);

  useEffect(() => {
    if (addList.length > 0) {
      if (searchFriend === "") {
        if (friendListBackup.length > 0) {
          setFriendList(friendListBackup);
        }
      } else {
        setFriendListBackup([...friendList]);
        const results = friendList.filter((user) =>
          user.fullname.toLowerCase().includes(searchFriend.toLowerCase())
        );
        setFriendList(results);
      }
    }
  }, [searchFriend]);
  useEffect(() => {
    if (friendList.filter((friend) => friend.add == true).length > 0) {
      setMemberAdded(true);
    } else {
      setMemberAdded(false);
    }
  }, [friendList]);

  const clickAddMember = (userId) => {
    const newAddList = [];
    const addListCopy = [...addList];
    addListCopy.map((user) => {
      if (user.id === userId) {
        newAddList.push({ ...user, add: !user.add });
      } else {
        newAddList.push(user);
      }
    });
    //console.log("newAddList: ", newAddList);

    setAddList(newAddList);
  };

  const handleConfirm = () => {
    const addedMemberList = [];
    let memberAddBoard;
    const memberAddBoardList = [];
    friendList.map((member) => {
      if (member.add) {
        addedMemberList.push(member);
      }
    });
    addedMemberList.map((member) => {
      memberAddBoard = {
        userId: `${member.id}`,
        role: "member",
        status: "Stay",
      };
      memberAddBoardList.push(memberAddBoard);
    });
    dispatch(Actions.updateMember(board, memberAddBoardList));
    setAddMemberOpen(false);
    //console.log("addedMemberList: ", addedMemberList);
  };

  const handleCancel = () => {
    const newAddList = [];
    const addListCopy = [...addList];
    addListCopy.map((user) => {
      newAddList.push({ ...user, add: false });
    });
    //console.log("newAddList: ", newAddList);
    setAddList(newAddList);
  };

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Icon>group</Icon>
      </IconButton>
      <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
        <div className="">
          {allUserCollect.map((member) => {
            //console.log("member: ", member);
            return (
              member.status === "Stay" && (
                <MenuItem className="px-8" key={member.id} onClick={(ev) => {}}>
                  <Avatar
                    className="w-32 h-32"
                    src={JSON.parse(member.info).avatar}
                  />
                  &nbsp;&nbsp;
                  <ListItemText>{member.fullname}</ListItemText>
                  &nbsp;
                  {member.role === "admin" ? (
                    <a style={{ color: "blue" }}>(A)</a>
                  ) : (
                    <a style={{ color: "green" }}>(M)</a>
                  )}
                  &nbsp;
                  {userisAdmin && member.role !== "admin" ? (
                    userisAdmin == false &&
                    allowMemberEdit === "false" ? null : (
                      <Button
                        style={{ color: "red", textTransform: "none" }}
                        onClick={() => {
                          const userID = JSON.stringify(member.id);
                          setKickMember({
                            open: true,
                            memberName: member.fullname,
                            memberId: userID,
                          });
                          memberDeleteBoard(board, userID);
                        }}
                      >
                        Kick
                      </Button>
                    )
                  ) : userisAdmin == false &&
                    allowMemberEdit === "false" ? null : (
                    userisAdmin && <Button>{""}</Button>
                  )}
                </MenuItem>
              )
            );
          })}
          {userisAdmin == false && allowMemberEdit === "false" ? null : (
            <MenuItem
              style={{ justifyContent: "center" }}
              onClick={() => {
                setAddMemberOpen(true);
              }}
            >
              {" "}
              <Icon>group_add</Icon> &nbsp;&nbsp;Add Member
            </MenuItem>
          )}
        </div>
      </ToolbarMenu>
      <BoardMessBox
        open={kickMember.open}
        title="Are You Sure ? "
        content={`Kick "${kickMember.memberName}" Out Of This Board?`}
        onYes={() => {
          memberDeleteBoard(board, kickMember.memberId);
          setKickMember({ open: false, memberName: "", memberId: "" });
          window.location.reload();
        }}
        onNo={() => {
          setKickMember({ open: false, memberName: "", memberId: "" });
        }}
        yes="Yes"
        no="No"
      />
      <Dialog
        onClose={() => {
          setAddMemberOpen(false);
        }}
        open={addMemberOpen}
      >
        <DialogTitle>Add More Member To This Board</DialogTitle>
        <DialogContent dividers>
          <Paper className={classes.memberAdd}>
            {friendList.map((member, index) => {
              return (
                member.add && (
                  <Chip
                    label={member.fullname}
                    key={index}
                    avatar={
                      <Avatar
                        className={classes.iconAddMember}
                        src={JSON.parse(member.info).avatar}
                      />
                    }
                    //onDelete={handleDelete(member)}
                    style={{ color: "#172b4d" }}
                    className={classes.chip}
                  />
                )
              );
            })}
            {!memberAdded && (
              <Typography
                style={{
                  marginTop: "5px",
                  marginLeft: "5px",
                  opacity: "0.4",
                }}
              >
                None Member Selected
              </Typography>
            )}
          </Paper>
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
          <List>
            {friendList.map((user) => {
              return (
                <ListItem
                  /* button onClick={() => handleListItemClick(email)} */
                  key={user.id}
                  className={classes.listItem}
                >
                  <Grid container key={user.id}>
                    <Grid item xs={10}>
                      <ListItemAvatar className="flex">
                        <Avatar
                          className="w-32 h-32"
                          src={JSON.parse(user.info).avatar}
                        />
                        &nbsp;&nbsp;
                        <ListItemText primary={user.fullname} />
                      </ListItemAvatar>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      className={classes.addContainer}
                      onClick={() => {
                        clickAddMember(user.id);
                      }}
                    >
                      {user.add ? <Icon>check</Icon> : <div>Add</div>}
                      {/* <Checkbox /> */}
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "#1976D2" }}
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </Button>
          <Button
            style={{ color: "red" }}
            onClick={() => {
              setAddMemberOpen(false);
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BoardMember;
