import {
  Icon,
  IconButton,
  TextField,
  Checkbox,
  ListItem,
} from "@material-ui/core";
import React from "react";
import { useForm, useUpdateEffect } from "@fuse/hooks";
import { useSelector } from "react-redux";
import { userIsAdmin } from "app/main/apps/scrumboard/store/allBoardFunction";

function CardChecklistItem(props) {
  const { item, onListItemChange, index } = props;
  const { form, handleChange } = useForm(item);

  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;

  useUpdateEffect(() => {
    onListItemChange(form, index);
  }, [form, index, onListItemChange]);

  if (!form) {
    return null;
  }

  return (
    <ListItem className="px-0" key={form.id} dense>
      <Checkbox
        checked={form.checked}
        name="checked"
        onChange={
          userisAdmin == false && allowMemberEdit === "false"
            ? null
            : handleChange
        }
        tabIndex={-1}
        disableRipple
      />
      <TextField
        className="flex flex-1 mx-8"
        name="name"
        value={form.name}
        InputProps={
          userisAdmin == false && allowMemberEdit === "false"
            ? { readOnly: true }
            : null
        }
        onChange={handleChange}
        variant="outlined"
      />
      {userisAdmin == false && allowMemberEdit === "false" ? null : (
        <IconButton aria-label="Delete" onClick={props.onListItemRemove}>
          <Icon>delete</Icon>
        </IconButton>
      )}
    </ListItem>
  );
}

export default CardChecklistItem;
