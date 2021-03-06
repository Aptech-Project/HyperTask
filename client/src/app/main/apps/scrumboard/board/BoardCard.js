import React from "react";
import {
  Card,
  Typography,
  Avatar,
  Icon,
  Tooltip,
  Grid,
} from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import moment from "moment";
import _ from "@lodash";
import * as Actions from "../store/actions";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

const useStyles = makeStyles((theme) => ({
  card: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  cardCover:{
    display: "block",
    width: "274px",
    height: "154px",
    objectFit: "cover",
  }
}));

function BoardCard(props) {
  const dispatch = useDispatch();
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const allUserCollect = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUserCollect
  );
  const classes = useStyles(props);
  const { card, index } = props;
  //const card = _.find(board.cards, { id: cardId });
  const checkItemsChecked = getCheckItemsChecked(card);
  const checkItems = getCheckItems(card);
  const commentsCount = getCommentsCount(card);

  function handleCardClick(ev, card) {
    ev.preventDefault();
    dispatch(Actions.openCardDialog(card));
  }

  function getCheckItemsChecked(card) {
    return _.sum(
      card.checklist.map((list) =>
        _.sum(list.checkItems.map((x) => (x.checked ? 1 : 0)))
      )
    );
  }

  function getCheckItems(card) {
    return _.sum(card.checklist.map((x) => x.checkItems.length));
  }

  function getCommentsCount(card) {
    return _.sum(card.activities.map((x) => (x.type === "comment" ? 1 : 0)));
  }

  return (
    <Draggable draggableId={card.id} index={index} type="card">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            className={clsx(
              classes.card,
              "w-full mb-16 rounded-4 cursor-pointer border-1"
            )}
            elevation={snapshot.isDragging ? 3 : 0}
            onClick={(ev) => handleCardClick(ev, card)}
          >
            {card.idAttachmentCover && card.idAttachmentCover !== "" && (
              <img
                className={clsx(classes.cardCover,"block")}
                src={
                  _.find(card.attachments, { id: card.idAttachmentCover }).src
                }
                alt="card cover"
              />
            )}

            <div className="p-16 pb-0">
              <Grid container>
                <Grid item xs={10}>
                  <Typography className="font-600 mb-12">
                    {card.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "right", color: "green" }}
                >
                  {card.isDone && <CheckCircleSharpIcon />}
                </Grid>
              </Grid>
              {card.labels.length > 0 && (
                <div className="flex flex-wrap mb-8">
                  {card.labels.map((id) => {
                    const label = _.find(JSON.parse(board.labels), { id });
                    return (
                      <Tooltip title={label.name} key={id}>
                        <div
                          className={clsx(
                            label.class,
                            "w-32  h-6 rounded-6 mr-6 mb-6"
                          )}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              )}

              {(card.dueDate || checkItems > 0) && (
                <div className="flex items-center mb-12">
                  {card.dueDate && (
                    <div
                      className={clsx(
                        "flex items-center px-8 py-4 mr-8 rounded-sm",
                        moment() > moment(card.dueDate)
                          ? "bg-red text-white"
                          : "bg-green text-white"
                      )}
                    >
                      <Icon className="text-16 mr-4">access_time</Icon>
                      <span>{moment(card.dueDate).format("MMM Do YY")}</span>
                    </div>
                  )}

                  {checkItems > 0 && (
                    <div
                      className={clsx(
                        "flex items-center px-8 py-4 mr-8 rounded-sm",
                        checkItemsChecked === checkItems
                          ? "bg-green text-white"
                          : "bg-grey-dark text-white"
                      )}
                    >
                      <Icon className="text-16 mr-4">check_circle</Icon>
                      <span>{checkItemsChecked}</span>
                      <span>/</span>
                      <span>{checkItems}</span>
                    </div>
                  )}
                </div>
              )}

              {card.members.length > 0 && allUserCollect.length > 0 && (
                <div className="flex flex-wrap mb-12">
                  {card.members.map((id) => {
                    const member = _.find(allUserCollect, {
                      id,
                    });
                    return (
                      <Tooltip title={member.fullname} key={id}>
                        <Avatar
                          className="mr-8 w-32 h-32"
                          src={JSON.parse(member.info).avatar}
                        />
                      </Tooltip>
                    );
                  })}
                  <div className=""></div>
                </div>
              )}
            </div>

            <div className="flex justify-between h-48 px-16 border-t-1">
              <div className="flex items-center">
                {/* {card.subscribed && (
                  <Icon className="text-18 mr-12" color="action">
                    remove_red_eye
                  </Icon>
                )} */}

                {card.content !== "" && (
                  <Icon className="text-18 mr-12" color="action">
                    description
                  </Icon>
                )}
              </div>

              <div className="flex items-center justify-end">
                {card.attachments && (
                  <span className="flex items-center ml-12">
                    <Icon className="text-18 mr-8" color="action">
                      attachment
                    </Icon>
                    <Typography color="textSecondary">
                      {card.attachments.length}
                    </Typography>
                  </span>
                )}
                {commentsCount > 0 && (
                  <span className="flex items-center ml-12">
                    <Icon className="text-18 mr-8" color="action">
                      comment
                    </Icon>
                    <Typography color="textSecondary">
                      {commentsCount}
                    </Typography>
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default BoardCard;
