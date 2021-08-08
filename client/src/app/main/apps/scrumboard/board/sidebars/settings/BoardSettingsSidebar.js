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
} from "@material-ui/core";
import * as Actions from "app/main/apps/scrumboard/store/actions";
import { useDispatch, useSelector } from "react-redux";
import BoardMessBox from "../../../model/BoardMessBox";
import History from "@history";
import Background1 from "../../backgroundImages/World-of-WarShips-Midway-T10.jpg";
import Background2 from "../../backgroundImages/uHUDnY.jpg";

function BoardSettingsSidebar(props) {
  const dispatch = useDispatch();
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const [deleteMessBox, setDeleteMessBox] = useState(false);

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
            () => props.setChangeBackground(Background1)
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

        <ListItem
          button
          // onClick={() =>
          //   dispatch(
          //     Actions.changeBoardSettings({
          //       subscribed: !board.settings.subscribed,
          //     })
          //   )
          // }
        >
          <ListItemIcon className="min-w-40">
            <Icon>remove_red_eye</Icon>
          </ListItemIcon>
          <ListItemText primary="Subscribe" />
          <ListItemSecondaryAction>
            <Switch
            // onChange={() =>
            //   dispatch(
            //     Actions.changeBoardSettings({
            //       subscribed: !board.settings.subscribed,
            //     })
            //   )
            // }
            // checked={board.settings.subscribed}
            />
          </ListItemSecondaryAction>
        </ListItem>

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
          <ListItemText primary="Delete Board" />
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
    </div>
  );
}

export default BoardSettingsSidebar;
