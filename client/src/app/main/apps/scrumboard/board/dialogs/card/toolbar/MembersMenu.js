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
import { useSelector } from "react-redux";

function MembersMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const allUserCollect = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUserCollect
  );
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
          {allUserCollect.map((member) => {
            return (
              member.status === "Stay" && (
                <MenuItem
                  className="px-8"
                  key={member.id}
                  onClick={(ev) => {
                    props.onToggleMember(member.id);
                  }}
                >
                  <Checkbox checked={props.idMembers.includes(member.id)} />
                  <Avatar
                    className="w-32 h-32"
                    src={JSON.parse(member.info).avatar}
                  />
                  &nbsp;&nbsp;
                  <ListItemText>{member.fullname}</ListItemText>
                </MenuItem>
              )
            );
          })}
        </div>
      </ToolbarMenu>
    </div>
  );
}

export default MembersMenu;
