import React, { useEffect, useState } from "react";
import { Icon, IconButton, Button, TextField } from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import ToolbarMenu from "./ToolbarMenu";
import AttachmentModel from "app/main/apps/scrumboard/model/AttachmentModel";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/main/apps/scrumboard/store/actions/index";
import BoardMessBox from "app/main/apps/scrumboard/model/BoardMessBox";

function AttachmentMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { form, resetForm } = useForm({
    file: "",
  });
  const [uploadFile, setUploadFile] = React.useState();
  const [openAlert, setOpenAlert] = React.useState();
  const dispatch = useDispatch();
  const newAttachment = useSelector(
    ({ scrumboardApp }) => scrumboardApp.card.attachmentCard
  );
  //const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);

  useEffect(() => {
    if (newAttachment) {
      const now = JSON.stringify(new Date());
      let attachAddType;
      if (newAttachment.fileUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        attachAddType = "image";
      } else {
        attachAddType = "doc";
      }
      const attachAdd = {
        name: newAttachment.fileName,
        src: newAttachment.fileUrl,
        time: now,
        type: attachAddType,
        extension: newAttachment.fileExtension,
      };
      props.onAddAttachment(new AttachmentModel(attachAdd));
    }
  }, [newAttachment]);

  useEffect(() => {
    if (!anchorEl) {
      resetForm();
    }
  }, [anchorEl, resetForm]);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function isFormInvalid() {
    return form.file === "";
  }

  const handleChange = (e) => {
    let imgFile = e.target.files[0];
    //console.log("fileSize: ", e.target.files[0].size);
    if (imgFile) {
      if (e.target.files[0].size < 3000000) {
        setUploadFile(imgFile);
      } else {
        setOpenAlert(true);
      }
    }
  };

  function handleSubmit(ev) {
    ev.preventDefault();
    dispatch(Actions.updateFileCard(uploadFile));
    setUploadFile();
    handleMenuClose();
  }

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Icon>attachment</Icon>
      </IconButton>
      <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
        <form onSubmit={handleSubmit} className="p-16 flex flex-col items-end">
          <input type="file" onChange={handleChange} />
          <Button
            color="secondary"
            type="submit"
            disabled={!uploadFile}
            variant="contained"
          >
            Add
          </Button>
        </form>
      </ToolbarMenu>
      <BoardMessBox
        open={openAlert}
        //title="File exceeds 300Mb"
        content={`File exceeds 300Mb`}
        //onYes={deleteBoard}
        onNo={() => {
          setOpenAlert(false);
        }}
        //yes="Yes"
        no="OK"
      />
    </div>
  );
}

export default AttachmentMenu;
