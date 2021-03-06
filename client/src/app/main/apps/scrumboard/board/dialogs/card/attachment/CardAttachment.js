import React, { useState } from "react";
import {
  Icon,
  Typography,
  Paper,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import wordIcon from "./word.png";
import excelIcon from "./excel.png";
import powerPointIcon from "./powerpoint.png";
import fileIcon from "./file.png";
import { userIsAdmin } from "app/main/apps/scrumboard/store/allBoardFunction";
import { useSelector } from "react-redux";

function CardAttachment(props) {
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;

  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  switch (props.item.type) {
    case "image": {
      return (
        <div className="flex w-full sm:w-1/2 mb-16" key={props.item.id}>
          <div className="flex items-center justify-center w-128 h-128 mr-16">
            <Paper className="rounded-4 overflow-hidden" elevation={1}>
              <img
                className="block max-h-full max-h-full"
                src={props.item.src}
                alt="attachment"
              />
            </Paper>
          </div>
          <div className="flex flex-auto flex-col justify-center items-start min-w-0">
            <div className="flex items-center w-full">
              <Typography className="text-16 font-600 truncate flex-shrink">
                {props.item.name}
              </Typography>
              {props.card.idAttachmentCover === props.item.id && (
                <Icon className="text-orange-light text-20 ml-4">star</Icon>
              )}
            </div>
            <Typography className="truncate w-full mb-12" color="textSecondary">
              {props.item.time}
            </Typography>
            {userisAdmin == false && allowMemberEdit === "false" ? null : (
              <Button
                aria-owns={anchorEl ? "actions-menu" : null}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                variant="outlined"
                size="small"
              >
                Actions
                <Icon className="text-20">arrow_drop_down</Icon>
              </Button>
            )}

            <Menu
              id="actions-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {props.card.idAttachmentCover !== props.item.id ? (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    props.makeCover(props.item.id);
                  }}
                >
                  Make Cover
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    props.removeCover();
                  }}
                >
                  Remove Cover
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  props.removeAttachment(props.item.id);
                }}
              >
                Remove Attachment
              </MenuItem>
            </Menu>
          </div>
        </div>
      );
    }
    case "doc": {
      let extension;
      if (props.item.extension === "docx") {
        extension = wordIcon;
      } else if (props.item.extension === "xlsx") {
        extension = excelIcon;
      } else if (props.item.extension === "pptx") {
        extension = powerPointIcon;
      } else {
        extension = fileIcon;
      }
      return (
        <div className="flex w-full sm:w-1/2 mb-16" key={props.item.id}>
          <Paper
            className="min-w-80 w-80 h-30 mr-16 flex items-center justify-center rounded-4 overflow-hidden"
            elevation={1}
          >
            <img
              className="block max-h-full max-h-full"
              src={extension}
              alt="attachment"
            />
          </Paper>
          <div className="flex flex-auto flex-col justify-center items-start min-w-0">
            <Typography className="text-16 font-600 truncate w-full">
              {props.item.name}
            </Typography>
            <Typography className="truncate w-full mb-12" color="textSecondary">
              {props.item.time}
            </Typography>
            <Button
              aria-owns={anchorEl ? "actions-menu" : null}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              variant="outlined"
              size="small"
            >
              Actions
              <Icon className="text-20">arrow_drop_down</Icon>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
              // onClick={() => {
              //   window.open(props.item.src, "_blank");
              // }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={props.item.src}
                  download
                  target="_blank"
                >
                  Download File
                </a>
              </MenuItem>
              {userisAdmin == false && allowMemberEdit === "false" ? null : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    props.removeAttachment(props.item.id);
                  }}
                >
                  Remove Attachment
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}

export default CardAttachment;
