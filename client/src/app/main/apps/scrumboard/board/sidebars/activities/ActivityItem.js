import React, { useState,  useEffect} from "react";
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
  const [member, setMember] = useState();
  useEffect(()=>{
    if (allUserCollect) {
      const user = _.find(allUserCollect, { id: parseInt(props.item.idMember) });
      setMember(user)
    }
  },[allUserCollect])
  
  console.log("user: ", member);

  return member ? (
    <>
    <ListItem dense >
      <Avatar
        className="w-32 h-32"
        alt={member.fullname}
        src={JSON.parse(member.info).avatar}
      />
      <div className="flex items-center ml-16">
        <Typography>{member.fullname}:</Typography>
      </div>
      
    </ListItem>
    <ListItem dense style={{marginTop: "-10px", marginLeft:"30px", maxWidth: "300px"}}>
      <div className="flex items-center ml-16">
        <Typography className="ml-8" style={{color: "darkblue"}}>{props.item.message}</Typography>
      </div>
    </ListItem>
    <ListItem dense style={{marginTop: "-10px", marginLeft:"30px"}}>
      <div className="flex items-center ml-16">
        <Typography className="ml-8 text-12" color="textSecondary">
        {props.item.time}
      </Typography>
      </div>
      
    </ListItem>
    </>
  ): null
}

export default ActivityItem;
