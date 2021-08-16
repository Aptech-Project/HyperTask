import React, { useCallback } from "react";
import {
  TextField,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
  InputAdornment,
  Tooltip,
  List,
  Switch,
} from "@material-ui/core";
import { FuseChipSelect } from "@fuse";
import { useForm, useDebounce, useUpdateEffect } from "@fuse/hooks";
import _ from "@lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/main/apps/scrumboard/store/actions/index";
import LabelModel from "app/main/apps/scrumboard/model/LabelModel";
import CardAttachment from "./attachment/CardAttachment";
import DueMenu from "./toolbar/DueMenu";
import LabelsMenu from "./toolbar/LabelsMenu";
import MembersMenu from "./toolbar/MembersMenu";
import CheckListMenu from "./toolbar/CheckListMenu";
import OptionsMenu from "./toolbar/OptionsMenu";
import CardChecklist from "./checklist/CardChecklist";
import CardActivity from "./activity/CardActivity";
import CardComment from "./comment/CardComment";
import AttachmentMenu from "./toolbar/AttachmentMenu";
import CommentModel from "../../../model/CommentModel";
import { userIsAdmin } from "../../../store/allBoardFunction";

function BoardCardForm(props) {
  const dispatch = useDispatch();
  const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  const allUserCollect = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUserCollect
  );

  const { form: cardForm, handleChange, setForm, setInForm } = useForm(card);
  const updateCard = useDebounce((board, newCard) => {
    dispatch(Actions.updateCard(board, { ...newCard }));
  }, 600);
  const dueDate = cardForm?.due || "";
  // const dueDate =
  //   cardForm && cardForm.due
  //     ? moment(cardForm.due).format("hh:mm:ss A MMM-DD-YY")
  //     : "";

  useUpdateEffect(() => {
    // const userID = localStorage.getItem("user_authenticated");
    // const memberList = JSON.parse(board.members);
    // let isAdmin;
    // memberList.map((member) => {
    //   if (member.userId === userID && member.userId.role === "admin") {
    //     isAdmin = true;
    //   }
    // });
    // if (isAdmin == false) {
    //   updateCard(board, cardForm);
    // } else {
    //   alert("you are not admin");
    // }
    updateCard(board, cardForm);
  }, [dispatch, board, cardForm, updateCard]);

  function removeDue() {
    setInForm("due", null);
  }

  function toggleCardDone(status) {
    setInForm("isDone", status);
    setInForm("doneAt", new Date());
  }

  function toggleLabel(labelId) {
    setInForm("labels", _.xor(cardForm.labels, [labelId]));
  }

  function toggleMember(memberId) {
    setInForm("members", _.xor(cardForm.members, [memberId]));
  }

  function toggleAttachment(attachment) {
    setInForm("attachments", _.xor(cardForm.attachments, [attachment]));
    const userID = localStorage.getItem("user_authenticated");
    const newActivity = new CommentModel({
      idMember: userID,
      type: "attachment",
      message:
        attachment.type === "image"
          ? `Add new Image ${attachment.name}`
          : `Add new File ${attachment.name}`,
    });
    return setInForm("activities", [
      { ...newActivity },
      ...cardForm.activities,
    ]);
  }

  function addCheckList(newList) {
    setInForm("checklist", [...cardForm.checklist, newList]);
  }

  function chipChange(name, value) {
    setInForm(
      name,
      value.map((item) => item.value)
    );
  }

  function addNewChip(name, value) {
    setInForm(name, [...cardForm[name], value]);
  }

  function makeCover(attachmentId) {
    setInForm("idAttachmentCover", attachmentId);
  }

  function removeCover() {
    setInForm("idAttachmentCover", "");
  }

  function removeAttachment(attachmentId) {
    setForm({
      ...cardForm,
      attachments: _.reject(cardForm.attachments, { id: attachmentId }),
      idAttachmentCover:
        cardForm.idAttachmentCover === attachmentId
          ? ""
          : cardForm.idAttachmentCover,
    });
  }

  const handleCheckListChange = useCallback(
    (item, index) => {
      setInForm(`checklist[${index}]`, item);
    },
    [setInForm]
  );

  function removeCheckList(id) {
    setInForm("checklist", _.reject(cardForm.checklist, { id: id }));
  }

  function commentAdd(comment) {
    return setInForm("activities", [{ ...comment }, ...cardForm.activities]);
  }

  return (
    <>
      <DialogTitle component="div" className="p-0">
        <AppBar position="static" elevation={1}>
          {userisAdmin == false && allowMemberEdit === "false" ? (
            <Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
              {cardForm.name}
            </Toolbar>
          ) : (
            <Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
              <div className="flex flex-1">
                <DueMenu
                  onDueChange={handleChange}
                  onRemoveDue={removeDue}
                  due={dueDate}
                />

                <LabelsMenu
                  onToggleLabel={toggleLabel}
                  labels={JSON.parse(board.labels)}
                  idLabels={cardForm.labels}
                />

                <MembersMenu
                  onToggleMember={toggleMember}
                  members={JSON.parse(board.members)}
                  idMembers={cardForm.members}
                />

                <AttachmentMenu onAddAttachment={toggleAttachment} />

                <CheckListMenu onAddCheckList={addCheckList} />

                <OptionsMenu
                  onRemoveCard={() =>
                    dispatch(Actions.removeCard(board, cardForm.id))
                  }
                />
              </div>
              <IconButton
                color="inherit"
                onClick={(ev) => dispatch(Actions.closeCardDialog())}
              >
                <Icon>close</Icon>
              </IconButton>
            </Toolbar>
          )}
        </AppBar>
      </DialogTitle>

      <DialogContent className="p-16 sm:p-24">
        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
          {cardForm.due && (
            <TextField
              label="Due date"
              type="datetime-local"
              name="due"
              value={dueDate}
              onChange={handleChange}
              placeholder=" Choose a due date"
              className="w-full sm:w-auto"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              InputProps={
                userisAdmin == false && allowMemberEdit === "false"
                  ? { readOnly: true }
                  : {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon color="action">today</Icon>
                        </InputAdornment>
                      ),
                    }
              }
            />
          )}
          {!cardForm.due && <div className="w-full sm:w-auto"></div>}
          <div className="mb-16 sm:mb-0 flex items-center">
            <Typography>Done: </Typography>
            <Switch
              onChange={() =>
                userisAdmin == false && allowMemberEdit === "false"
                  ? null
                  : toggleCardDone(!cardForm.isDone)
              }
              checked={cardForm.isDone}
            />
            {/* {React.useMemo(() => {
              const list = card
                ? _.find(JSON.parse(board.lists), (_list) =>
                    _list.cards.includes(card.id)
                  )
                : null;

              return <Typography>{list && list.name}</Typography>;
            }, [board, card])} */}
          </div>
        </div>

        <div className="flex items-center mb-24">
          <TextField
            label="Title"
            type="text"
            name="name"
            value={cardForm.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            InputProps={
              userisAdmin == false && allowMemberEdit === "false"
                ? { readOnly: true }
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        {cardForm.subscribed && (
                          <Icon className="text-20" color="action">
                            remove_red_eye
                          </Icon>
                        )}
                      </InputAdornment>
                    ),
                  }
            }
          />
        </div>

        <div className="w-full mb-24">
          <TextField
            label="Description"
            name="content"
            multiline
            rows="4"
            value={cardForm.content}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={
              userisAdmin == false && allowMemberEdit === "false"
                ? { readOnly: true }
                : null
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row">
          {cardForm.labels.length > 0 && (
            <div className="flex-1 mb-24">
              <div className="flex items-center mt-16 mb-12">
                <Icon className="text-20 mr-8" color="inherit">
                  label
                </Icon>
                <Typography className="font-600 text-16">Labels</Typography>
              </div>
              <FuseChipSelect
                className={cardForm.members.length > 0 && "sm:mr-8"}
                value={cardForm.labels.map((labelId) => {
                  const label = _.find(JSON.parse(board.labels), {
                    id: labelId,
                  });
                  return (
                    label && {
                      value: labelId,
                      label: label.name,
                      class: label.class,
                    }
                  );
                })}
                onChange={(value) => {
                  if (userisAdmin == false && allowMemberEdit === "false") {
                    return null;
                  } else {
                    chipChange("labels", value);
                  }
                }}
                //onChange={(value) =>  chipChange("labels", value)}
                placeholder="Select multiple Labels"
                isMulti
                textFieldProps={{
                  variant: "outlined",
                }}
                options={JSON.parse(board.labels).map((label) => ({
                  value: label.id,
                  label: label.name,
                  class: label.class,
                }))}
                onCreateOption={(name) => {
                  if (userisAdmin == false && allowMemberEdit === "false") {
                    return null;
                  } else {
                    // Create New Label
                    const newLabel = new LabelModel({ name });
                    // Ad new Label to board(redux store and server)
                    dispatch(Actions.addLabel(newLabel));
                    // Trigger handle chip change
                    addNewChip("labels", newLabel.id);
                    return newLabel.id;
                  }
                }}
              />
            </div>
          )}

          {cardForm.members.length > 0 && (
            <div className="flex-1 mb-24">
              <div className="flex items-center mt-16 mb-12">
                <Icon className="text-20 mr-8" color="inherit">
                  supervisor_account
                </Icon>
                <Typography className="font-600 text-16">Members</Typography>
              </div>
              <FuseChipSelect
                className={cardForm.labels.length > 0 && "sm:ml-8"}
                value={cardForm.members.map((memberId) => {
                  const member = _.find(allUserCollect, {
                    id: memberId,
                  });
                  // const memberName = member.name.split(" ");
                  // const member1stChar = memberName[0].charAt(0).toUpperCase();
                  // let member2ndChar = "";
                  // if (memberName.length > 1) {
                  //   member2ndChar = memberName[1].charAt(0).toUpperCase();
                  // }
                  return (
                    member && {
                      value: member.id,
                      label: (
                        <Tooltip title={member.fullname}>
                          {
                            <>
                              <Avatar
                                className="-ml-12 w-32 h-32"
                                src={JSON.parse(member.info).avatar}
                              />
                              &nbsp;
                              <Typography>{member.fullname}</Typography>
                            </>
                          }
                        </Tooltip>
                      ),
                    }
                  );
                })}
                onChange={(value) => {
                  if (userisAdmin == false && allowMemberEdit === "false") {
                    return null;
                  } else {
                    chipChange("members", value);
                  }
                }}
                //onChange={(value) => chipChange("members", value)}
                placeholder="Select multiple Members"
                isMulti
                textFieldProps={{
                  variant: "outlined",
                }}
                // options={JSON.parse(board.members).map((member) => ({
                //   value: member.id,
                //   label: (
                //     <span className="flex items-center">
                //       <Avatar className="w-32 h-32 mr-8" src={member.avatar} />
                //       {member.name}
                //     </span>
                //   ),
                // }))}
                variant="fixed"
              />
            </div>
          )}
        </div>

        {cardForm.attachments.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center mt-16 mb-12">
              <Icon className="text-20 mr-8" color="inherit">
                attachment
              </Icon>
              <Typography className="font-600 text-16">Attachments</Typography>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap">
              {cardForm.attachments.map((item, index) => (
                <CardAttachment
                  item={{ ...item }}
                  card={cardForm}
                  makeCover={makeCover}
                  removeCover={removeCover}
                  removeAttachment={removeAttachment}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}

        {cardForm.checklist.map((checklist, index) => (
          <CardChecklist
            key={checklist.id}
            checklist={checklist}
            index={index}
            onCheckListChange={handleCheckListChange}
            onRemoveCheckList={() => removeCheckList(checklist.id)}
          />
        ))}
        {userisAdmin == false && allowMemberEdit === "false" ? null : (
          <div className="mb-24">
            <div className="flex items-center mt-16 mb-12">
              <Icon className="text-20 mr-8" color="inherit">
                comment
              </Icon>
              <Typography className="font-600 text-16">Comment</Typography>
            </div>
            <div>
              <CardComment
                members={JSON.parse(board.members)}
                onCommentAdd={commentAdd}
              />
            </div>
          </div>
        )}

        {cardForm.activities.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center mt-16">
              <Icon className="text-20 mr-8" color="inherit">
                list
              </Icon>
              <Typography className="font-600 text-16">Activity</Typography>
            </div>
            <List className="">
              {cardForm.activities.map((item) => (
                <CardActivity
                  item={item}
                  key={item.id}
                  members={JSON.parse(board.members)}
                />
              ))}
            </List>
          </div>
        )}
      </DialogContent>
    </>
  );
}

export default BoardCardForm;
