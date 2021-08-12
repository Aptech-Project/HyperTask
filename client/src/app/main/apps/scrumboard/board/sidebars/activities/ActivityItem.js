import React from "react";
import { Avatar, ListItem, Typography } from "@material-ui/core";
import clsx from "clsx";
import _ from "@lodash";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  commentBubble: {
    borderRadius: "5px 20px 20px 5px",
    border: "1px solid " + theme.palette.divider,
  },
}));

function ActivityItem(props) {
  const classes = useStyles(props);
  const allUserCollect = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUserCollect
  );
  const user = _.find(allUserCollect, { id: parseInt(props.item.idMember) });

  return (
    <ListItem dense className="px-0">
      <Avatar
        className="w-32 h-32"
        alt={user.fullname}
        src={JSON.parse(user.info).avatar}
      />
      <div className="flex items-center ml-16">
        <Typography>{user.name},</Typography>
        <Typography className="ml-8">{props.item.message}</Typography>
      </div>
      <Typography className="ml-8 text-12" color="textSecondary">
        {props.item.time}
      </Typography>
    </ListItem>
  );
}

export default ActivityItem;
