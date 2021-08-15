import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Icon,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  Hidden,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import clsx from "clsx";
import BoardTitle from "./BoardTitle";
import BoardList from "./BoardList";
import BoardAddList from "./BoardAddList";
import BoardCardDialog from "./dialogs/card/BoardCardDialog";
import BoardSettingsSidebar from "./sidebars/settings/BoardSettingsSidebar";
import { useDispatch, useSelector } from "react-redux";
import BoardMember from "./BoardMembers";
import { userIsAdmin } from "../store/allBoardFunction";
import BoardActivitiesSidebar from "./sidebars/activities/BoardActivitiesSidebar";

function Board(props) {
  const dispatch = useDispatch();
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const allUser = useSelector(
    ({ scrumboardApp }) => scrumboardApp.userBoard.allUser
  );

  //const profile = useSelector((state) => state.login.findId);
  const containerRef = useRef(null);
  const [userisAdmin, setUserisAdmin] = useState();
  const [allowMemberEdit, setAllowMemberEdit] = useState();
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [changeBackground, setChangeBackground] = useState("");
  console.log("board: ", board);
  // if (board) {
  //   dispatch(Actions.resetBoard());
  // }
  useEffect(() => {
    //console.log("props: ", props);
    dispatch(Actions.getBoard(props.match.params.boardId));
    dispatch(Actions.getAllUserBoard());
    return () => {
      dispatch(Actions.resetBoard());
      dispatch(Actions.resetUserBoards());
    };
  }, [dispatch, props.match.params]);
  useEffect(() => {
    if (board) {
      console.log("boardList: ", board.lists);
      const isAdmin = userIsAdmin(board);
      const boardBackground = JSON.parse(board.info).backgroundImage;
      const allowEdit = JSON.parse(board.info).allowMemberEdit;
      setUserisAdmin(isAdmin);
      setAllowMemberEdit(allowEdit);
      setChangeBackground(boardBackground);
      const allMember = [];
      JSON.parse(board.members).map((member) => {
        allUser.map((user) => {
          if (member.userId === JSON.stringify(user.id)) {
            const newUser = {
              ...user,
              status: member.status,
              role: member.role,
            };
            allMember.push(newUser);
          }
        });
      });
      console.log("allMember: ", allMember);
      dispatch(Actions.allUserBoardCollect(allMember));
    }
  }, [allUser, board]);

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log("result: ", result);
    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering list
    if (result.type === "list") {
      dispatch(Actions.reorderList(result));
    }

    // reordering card
    if (result.type === "card") {
      dispatch(Actions.reorderCard(result));
    }
  }

  function toggleSettingsDrawer(state) {
    setSettingsDrawerOpen(state === undefined ? !settingsDrawerOpen : state);
  }
  function toggleActivityDrawer(state) {
    setActivityOpen(state === undefined ? !activityOpen : state);
  }

  if (!board) {
    return null;
  }

  return (
    board && (
      <div
        className="flex flex-1 flex-auto flex-col w-full h-full relative"
        ref={containerRef}
      >
        <AppBar position="static" color="primary">
          <Toolbar className="flex items-center justify-between px-4 sm:px-24 h-64 container">
            <Hidden xsDown>
              <Button
                to="/apps/scrumboard/boards/"
                component={Link}
                variant="contained"
              >
                <Icon className="mr-8">assessment</Icon>
                Boards
              </Button>
            </Hidden>

            <Hidden smUp>
              <IconButton
                color="inherit"
                to="/apps/scrumboard/boards/"
                component={Link}
              >
                <Icon>assessment</Icon>
              </IconButton>
            </Hidden>

            <div className="flex flex-1 justify-center items-center">
              <BoardTitle />
            </div>

            <BoardMember members={board.members} />
            <IconButton
              color="inherit"
              onClick={() => toggleActivityDrawer(true)}
            >
              <Icon>speaker_notes</Icon>
            </IconButton>
            {userisAdmin == false && allowMemberEdit === "false" ? null : (
              <IconButton
                color="inherit"
                onClick={() => toggleSettingsDrawer(true)}
              >
                <Icon>settings</Icon>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <div
          className={clsx("flex flex-1 overflow-x-auto")}
          style={{
            backgroundImage: changeBackground,
            backgroundSize: "cover",
          }} // ../board/backgroundImages/background1.jpg
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" type="list" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="flex container p-16 md:p-24"
                >
                  {JSON.parse(board.lists).map((list, index) => (
                    <BoardList key={list.id} list={list} index={index} />
                  ))}
                  {provided.placeholder}

                  <BoardAddList />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <Drawer
          anchor="right"
          style={{ top: "120px", right: "55px" }}
          className="absolute overflow-hidden"
          classes={{
            paper: "absolute w-320",
          }}
          BackdropProps={{
            classes: {
              root: "absolute",
            },
          }}
          container={containerRef.current}
          ModalProps={{
            keepMounted: true,
          }}
          open={settingsDrawerOpen}
          onClose={() => toggleSettingsDrawer(false)}
        >
          <BoardSettingsSidebar setChangeBackground={setChangeBackground} />
        </Drawer>
        <Drawer
          anchor="right"
          style={{ top: "120px", right: "55px" }}
          className="absolute overflow-hidden"
          classes={{
            paper: "absolute w-320",
          }}
          BackdropProps={{
            classes: {
              root: "absolute",
            },
          }}
          container={containerRef.current}
          ModalProps={{
            keepMounted: true,
          }}
          open={activityOpen}
          onClose={() => toggleActivityDrawer(false)}
        >
          <BoardActivitiesSidebar />
        </Drawer>

        <BoardCardDialog />
      </div>
    )
  );
}

export default withReducer("scrumboardApp", reducer)(withRouter(Board));
