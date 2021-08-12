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
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import BoardMessBox from "../../../model/BoardMessBox";
import History from "@history";
import Background1 from "../../backgroundImages/background1.jpg";
import Background2 from "../../backgroundImages/background2.jpg";
import { userIsAdmin } from "../../../store/allBoardFunction";
import { makeStyles } from "@material-ui/styles";
import ActivityItem from "./ActivityItem";

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

function BoardActivitiesSidebar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="flex w-full justify-center">Activities</Toolbar>
      </AppBar>
      <List className="py-16" dense>
        {JSON.parse(board.activities).map((item) => (
          <ActivityItem
            item={item}
            key={item.id}
            members={JSON.parse(board.members)}
          />
        ))}
      </List>
    </div>
  );
}

export default BoardActivitiesSidebar;
