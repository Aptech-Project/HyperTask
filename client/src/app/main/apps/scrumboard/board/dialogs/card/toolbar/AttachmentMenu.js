import React, { useEffect, useState } from "react";
import { Icon, IconButton, Button, TextField } from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import ToolbarMenu from "./ToolbarMenu";
import AttachmentModel from "app/main/apps/scrumboard/model/AttachmentModel";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/main/apps/scrumboard/store/actions/index";

function AttachmentMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { form, resetForm } = useForm({
    file: "",
  });
  const [uploadFile, setUploadFile] = React.useState();
  const dispatch = useDispatch();
  const newAttachment = useSelector(
    ({ scrumboardApp }) => scrumboardApp.card.attachmentCard
  );
  //const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);

  useEffect(() => {
    if (newAttachment) {
      console.log("newAttachment: ", newAttachment);
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
    //console.log(e.target.files);
    let imgFile = e.target.files[0];
    setUploadFile(imgFile);
    //const reader = new FileReader();
    // reader.onload = (x) => {
    //   console.log("x.target.result: ", x.target.result);
    //   setUploadFile(x.target.result);
    // };
    // reader.readAsDataURL(imgFile);
  };

  function handleSubmit(ev) {
    ev.preventDefault();
    // if (isFormInvalid()) {
    //   return;
    // }
    //const dataArray = new FormData();
    //dataArray.append("fileSrc", uploadFile);
    //console.log("dataArray: ", dataArray);
    dispatch(Actions.updateFileCard(uploadFile));
    //props.onAddAttachment(new AttachmentModel(form));
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
          {/* <TextField
            label="Add Your File"
            name="file"
            //value={form.file}
            onChange={(e) => {
              handleChange(e);
            }}
            fullWidth
            className="mb-12"
            variant="outlined"
            type="file"
            required
            autoFocus
          /> */}
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
    </div>
  );
}

export default AttachmentMenu;
