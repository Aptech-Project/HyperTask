import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  ListItemText,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ToolbarMenu from "./ToolbarMenu";

function MembersMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Icon>account_circle</Icon>
      </IconButton>
      <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
        <div className="">
          {props.members.map((member) => {
            console.log("member: ", member);
            const memberName = member.name.split(" ");
            const member1stChar = memberName[0].charAt(0).toUpperCase();
            let member2ndChar = "";
            if (memberName.length > 1) {
              member2ndChar = memberName[1].charAt(0).toUpperCase();
            }
            return (
              <MenuItem
                className="px-8"
                key={member.userId}
                onClick={(ev) => {
                  props.onToggleMember(member.userId);
                }}
              >
                <Checkbox checked={props.idMembers.includes(member.userId)} />
                {member.avatar ? (
                  <Avatar className="w-32 h-32" src={member.avatar} />
                ) : (
                  <Avatar className="w-32 h-32">
                    <Typography>
                      {member1stChar}
                      {member2ndChar}
                    </Typography>
                  </Avatar>
                )}
                &nbsp;&nbsp;
                <ListItemText>{member.name}</ListItemText>
              </MenuItem>
            );
          })}
        </div>
      </ToolbarMenu>
    </div>
  );
}

export default MembersMenu;
