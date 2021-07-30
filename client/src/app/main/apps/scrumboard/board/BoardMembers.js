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
import ToolbarMenu from "./dialogs/card/toolbar/ToolbarMenu";
//import ToolbarMenu from "./ToolbarMenu";

function BoardMember(props) {
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
        <Icon>group</Icon>
      </IconButton>
      <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
        <div className="">
          {props.members.map((member) => {
            return (
              <MenuItem className="px-8" key={member.id} onClick={(ev) => {}}>
                <Avatar className="w-32 h-32" src={member.avatar} />
                &nbsp;&nbsp;
                <ListItemText>{member.name}</ListItemText>
              </MenuItem>
            );
          })}
          <MenuItem>
            {" "}
            <Icon>group_add</Icon> &nbsp;&nbsp;Add Member
          </MenuItem>
        </div>
      </ToolbarMenu>
    </div>
  );
}

export default BoardMember;
