import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Slide,
  Paper,
} from "@material-ui/core";
import * as Actions from "app/main/apps/scrumboard/store/actions";
import { useDispatch, useSelector } from "react-redux";
import BoardMessBox from "../../../model/BoardMessBox";
import History from "@history";
import Background1 from "../../backgroundImages/background1.jpg";
import Background2 from "../../backgroundImages/background2.jpg";
import { userIsAdmin } from "../../../store/allBoardFunction";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  boardBackground: {
    borderRadius: "8px",
    boxSizing: "border-box",
    display: "inline-block",
    padding: "0 4px 8px",
    position: "relative",
    textAlign: "left",
    verticalAlign: "top",
    width: "50%",
    zIndex: 1,
  },
  backgroundBox: {
    backgroundColor: "#dfe1e6",
    backgroundSize: "cover",
    borderRadius: "8px",
    display: "block",
    height: "96px",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  iconNoBackground: {
    padding: "20%",
    width: "inherit",
    height: "inherit",
    justifyContent: "space-evenly",
    display: "flex",
    fontSize: "40px",
    opacity: 0.3,
  },
}));

const background = [
  `url(${require("../../backgroundImages/background1.jpg")})`,
  `url(${require("../../backgroundImages/background2.jpg")})`,
  `url(${require("../../backgroundImages/background3.jpg")})`,
  `url(${require("../../backgroundImages/background4.jpg")})`,
  `url(${require("../../backgroundImages/background5.jpg")})`,
  `url(${require("../../backgroundImages/background6.jpg")})`,
  `url(${require("../../backgroundImages/background7.jpg")})`,
  `url(${require("../../backgroundImages/background8.jpg")})`,
  `url(${require("../../backgroundImages/background9.jpg")})`,
  `url(${require("../../backgroundImages/background10.jpg")})`,
];

function BoardSettingsSidebar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const [deleteMessBox, setDeleteMessBox] = useState(false);
  const [openBackgroundSetting, setOpenBackgroundSetting] = useState(false);
  const isAdmin = userIsAdmin(board);

  const deleteBoard = () => {
    const userId = localStorage.getItem("user_authenticated");
    // let boardToDelete;
    // boards.map((board) => {
    //   if (board.id === settingMenu.boardId) {
    //     boardToDelete = board;
    //   }
    //   return null;
    // });
    let userisAdmin;
    JSON.parse(board.members).map((member) => {
      if (member.userId === userId && member.role === "admin") {
        userisAdmin = true;
      }
    });
    if (userisAdmin) {
      dispatch(Actions.adminDeleteBoard(board.id, userId));
    } else {
      dispatch(Actions.memberDeleteBoard(board, userId));
    }
    setDeleteMessBox(false);
    History.goBack();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="flex w-full justify-center">Settings</Toolbar>
      </AppBar>
      <List className="py-16" dense>
        <ListItem
          button
          onClick={
            () => {
              //props.setChangeBackground(Background1)
              setOpenBackgroundSetting(!openBackgroundSetting);
            }
            // dispatch(
            //   Actions.changeBoardSettings({
            //     cardCoverImages: !board.settings.cardCoverImages,
            //   })
            // )
          }
        >
          <ListItemIcon className="min-w-40">
            <Icon>photo</Icon>
          </ListItemIcon>
          <ListItemText primary="Change Board Background" />
          {/* <ListItemSecondaryAction>
            <Switch
            // onChange={() =>
            //   dispatch(
            //     Actions.changeBoardSettings({
            //       cardCoverImages: !board.settings.cardCoverImages,
            //     })
            //   )
            // }
            // checked={board.settings.cardCoverImages}
            />
          </ListItemSecondaryAction> */}
        </ListItem>
        {isAdmin ? (
          <ListItem
            button
            onClick={() =>
              dispatch(
                Actions.changeBoardSettings({
                  allowMemberEdit:
                    JSON.parse(board.info).allowMemberEdit === "true"
                      ? "false"
                      : "true",
                })
              )
            }
          >
            <ListItemIcon className="min-w-40">
              <Icon>vpn_key</Icon>
            </ListItemIcon>
            <ListItemText primary="Allow Member Edit Board" />
            <ListItemSecondaryAction>
              <Switch
                onChange={() =>
                  dispatch(
                    Actions.changeBoardSettings({
                      allowMemberEdit:
                        JSON.parse(board.info).allowMemberEdit === "true"
                          ? "false"
                          : "true",
                    })
                  )
                }
                checked={
                  JSON.parse(board.info).allowMemberEdit === "true"
                    ? true
                    : false
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        ) : null}

        {/* <ListItem button onClick={() => dispatch(Actions.copyBoard(board))}>
          <ListItemIcon className="min-w-40">
            <Icon>file_copy</Icon>
          </ListItemIcon>
          <ListItemText primary="Copy Board" />
        </ListItem> */}

        <ListItem
          button
          onClick={() => {
            //dispatch(Actions.deleteBoard(board.id))
            setDeleteMessBox(true);
          }}
        >
          <ListItemIcon className="min-w-40">
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText primary={isAdmin ? "Delete Board" : "Leave Board"} />
        </ListItem>
      </List>
      <BoardMessBox
        open={deleteMessBox}
        title="Are You Sure ? "
        content={`Delete "${board.name}" Board?`}
        onYes={deleteBoard}
        onNo={() => {
          setDeleteMessBox(false);
        }}
        yes="Yes"
        no="No"
      />
      <Slide direction="left" in={openBackgroundSetting}>
        <List
          dense
          style={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          <ListItem>
            <ListItemText primary="Select Background" />
          </ListItem>
        </List>
      </Slide>
      <Slide
        direction="left"
        in={openBackgroundSetting}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={4} className={classes.paper}>
          <div
            style={{
              display: "block",
            }}
          >
            <div
              className={classes.boardBackground}
              onClick={() => {
                props.setChangeBackground(
                  `url(${require("../../backgroundImages/background0.jpg")})`
                );
                dispatch(
                  Actions.changeBoardSettings({
                    backgroundImage: "",
                  })
                );
              }}
            >
              <span
                className={classes.backgroundBox}
                style={{
                  backgroundImage: `url(${require("../../backgroundImages/background0.jpg")})`,
                }}
              >
                <Icon className={classes.iconNoBackground}>block</Icon>
              </span>
            </div>
            {background.map((bgr, index) => (
              <div
                key={index}
                className={classes.boardBackground}
                onClick={() => {
                  props.setChangeBackground(bgr);
                  dispatch(
                    Actions.changeBoardSettings({
                      backgroundImage: bgr,
                    })
                  );
                }}
              >
                <span
                  className={classes.backgroundBox}
                  style={{
                    backgroundImage: bgr,
                  }}
                ></span>
              </div>
            ))}
          </div>
        </Paper>
      </Slide>
    </div>
  );
}

export default BoardSettingsSidebar;
