import React, { useEffect, useState } from "react";
import { Typography, Icon, Grid, Menu, MenuItem } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { FuseAnimateGroup } from "@fuse";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddNewBoard from "../model/AddNewBoard";
import BoardMessBox from "../model/BoardMessBox";
import { boardTemplate } from "./boardTemplate";
import History from "@history";
//import backgroundTem1 from "../board/backgroundImages/backgroundTem7.jpg"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary,
    //color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  board: {
    cursor: "pointer",
    boxShadow: theme.shadows[0],
    height: "96px",
    transitionProperty: "box-shadow border-color",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    background: "rgba(9,30,66,.04)",
    color: "#172b4d",
    "&:hover": {
      boxShadow: theme.shadows[6],
    },
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: fade("#172b4d", 0.6),
    "&:hover": {
      borderColor: fade("#172b4d", 0.8),
    },
  },
  boardSetting: {
    marginTop: "10px",
    alignItems: "flex-end",
    cursor: "pointer",
  },
  boardContain: {
    padding: "1rem",
    width: "20%",
  },
  settingBoardContain: {
    width: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    color: "gray",
    "&:hover": {
      color: "#172b4d",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary,
    marginRight: theme.spacing(2),
    marginLeft: "1rem",
    marginTop: 20,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#172b4d",
  },
  inputRoot: {
    color: "#172b4d",
    border: " 1px solid gray",
    backgroundColor: theme.palette.primary,
    "&:hover": {
      backgroundColor: "rgba(9,30,66,.04)",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  content: {
    flex: "1 1 100%",
    display: "flex",
    minHeight: 0,
    borderRadius: "8px 8px 0 0",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: "1 1 100%",
    display: "flex",
    padding: "0 3.2rem",
    zIndex: 2,
    maxWidth: "100%",
    minWidth: 0,
    minHeight: 0,
    flexDirection: "column",
  },
  contentHeader: {
    color: "#fff",
    height: "136px",
    display: "flex",
    maxHeight: "136px",
    minHeight: "136px",
  },
  topBg: {
    top: 0,
    left: 0,
    right: 0,
    height: "200px",
    position: "absolute",
    background: "linear-gradient(to right, #2D323E 0%, #3C4252 100%)",
    pointerEvents: "none",
    backgroundSize: "cover",
  },
}));

function Boards(props) {
  const dispatch = useDispatch();
  const boards = useSelector(({ scrumboardApp }) => scrumboardApp.boards);
  const boardTemplates = boardTemplate;
  const profile = useSelector((state) => state.login.findId);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [settingMenu, setSettingMenu] = useState({
    anchorEl: null,
    boardId: "",
    boardName: "",
  });
  const [addNewBoardLog, setAddNewBoardLog] = useState({
    open: false,
    value: "",
    members: [],
    type: "",
  });
  const [messBox, setMessBox] = useState({
    delete: false,
  });

  useEffect(() => {
    if (searchValue === "") {
      const userId = localStorage.getItem("user_authenticated");
      const boardsUserStay = [];
      boards.map((board) => {
        if (board) {
          JSON.parse(board.members).map((member) => {
            if (member.userId === userId && member.status === "Stay") {
              boardsUserStay.push(board);
            }
          });
        }
      });
      setSearchResult([...boardsUserStay]);
    } else {
      const userId = localStorage.getItem("user_authenticated");
      const boardsUserStay = [];
      boards.map((board) => {
        if (board) {
          JSON.parse(board.members).map((member) => {
            if (member.userId === userId && member.status === "Stay") {
              boardsUserStay.push(board);
            }
          });
        }
      });
      const results = boardsUserStay.filter((board) =>
        board.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResult(results);
    }
  }, [boards, searchValue]);

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getBoards());
    dispatch(Actions.getAllUserBoard());
    return () => {
      dispatch(Actions.resetBoards());
      dispatch(Actions.resetUserBoards());
    };
  }, [dispatch]);

  const handleAddNewBoard = (boardList) => {
    if (boardList) {
      setAddNewBoardLog({ ...addNewBoardLog, open: true, type: boardList });
    } else {
      setAddNewBoardLog({ ...addNewBoardLog, open: true });
    }
  };
  const handleAddNewBoardConfirm = () => {
    if (addNewBoardLog.type) {
      dispatch(
        Actions.newBoardTemplate({
          name: addNewBoardLog.value,
          members: addNewBoardLog.members,
          lists: addNewBoardLog.type,
        })
      );
    } else {
      dispatch(
        Actions.newBoard({
          name: addNewBoardLog.value,
          members: addNewBoardLog.members,
        })
      );
    }
  };
  const deleteBoard = () => {
    const userId = localStorage.getItem("user_authenticated");
    let boardToDelete;
    boards.map((board) => {
      if (board.id === settingMenu.boardId) {
        boardToDelete = board;
      }
      return null;
    });
    let userisAdmin;
    JSON.parse(boardToDelete.members).map((member) => {
      if (member.userId === userId && member.role === "admin") {
        userisAdmin = true;
      }
    });
    if (userisAdmin) {
      dispatch(Actions.adminDeleteBoard(settingMenu.boardId, userId));
    } else {
      dispatch(Actions.memberDeleteBoard(boardToDelete, userId));
      window.location.reload();
    }
    setSettingMenu({ ...settingMenu, anchorEl: null });
    setMessBox({ ...messBox, delete: false });
  };

  return (
    <>
      <div className={classes.topBg}></div>
      <div className={classes.contentWrapper}>
        <div className={classes.contentHeader}>
          <Typography
            className=" text-32 sm:text-40 font-300" /* sm:mt-88 sm:py-24 */
            style={{ color: "antiquewhite" }}
          >
            Your Boards
          </Typography>
        </div>
        <div className={classes.content}>
          <div
            className={clsx(
              classes.root,
              "flex flex-grow flex-shrink-0 flex-col items-center"
            )}
          >
            <Grid container>
              {/* <Grid item xs={1}></Grid> */}
              <Grid item xs={12}>
                <div
                  className="flex flex-grow flex-shrink-0 flex-col container px-16 md:px-24"
                  style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
                >
                  {/* <FuseAnimate> */}
                  {/* </FuseAnimate> */}
                  <Typography
                    className="font-300" /* sm:mt-88 sm:py-24 */
                    style={{
                      color: "#5e6c84",
                      fontSize: "25px",
                      marginTop: "20px",
                    }}
                  >
                    Board Templates
                  </Typography>
                  <div>
                    <FuseAnimateGroup
                      className="flex flex-wrap w-full"
                      enter={{
                        animation: "transition.slideUpBigIn",
                        duration: 300,
                      }}
                      style={{ paddingBottom: "3.2rem" }}
                    >
                      {boardTemplates.map((board) => (
                        <div key={board.id} className={classes.boardContain}>
                          <div
                            className={clsx(classes.board, "rounded")}
                            style={{
                              backgroundImage: board.info.backgroundImage,
                              backgroundSize: "cover",
                            }}
                            onClick={() => handleAddNewBoard(board.lists)}
                          >
                            <Link
                              // to={{
                              //   pathname: `/apps/scrumboard/boards/${board.id}`,
                              // }}
                              className={
                                "flex items-center justify-center" //w-full h-full
                              }
                              style={{
                                paddingBottom: "30px",
                                paddingTop: "25px",
                              }}
                              role="button"
                            >
                              <Typography
                                className="text-16 font-300 text-center px-32"
                                style={{ color: "white", fontWeight: 1000 }}
                              >
                                {board.name}
                              </Typography>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </FuseAnimateGroup>
                  </div>

                  <Typography
                    className="font-300" /* sm:mt-88 sm:py-24 */
                    style={{ color: "#5e6c84", fontSize: "25px" }}
                  >
                    All Boards
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search boards…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <FuseAnimateGroup
                      className="flex flex-wrap w-full py-32"
                      enter={{
                        animation: "transition.slideUpBigIn",
                        duration: 300,
                      }}
                    >
                      {searchResult.map((board) => (
                        <div key={board.id} className={classes.boardContain}>
                          <div
                            className={clsx(classes.board, "rounded")}
                            style={{
                              backgroundImage: JSON.parse(board.info)
                                .backgroundImage, //`url(${require("../board/backgroundImages/background1.jpg")})`
                              backgroundSize: "cover",
                            }}
                          >
                            <div className={classes.settingBoardContain}>
                              {JSON.parse(board.info).backgroundImage ? (
                                <Icon
                                  className="text-26"
                                  style={{ color: "black" }}
                                  aria-controls="setting-menu"
                                  onClick={(e) => {
                                    setSettingMenu({
                                      ...settingMenu,
                                      anchorEl: e.currentTarget,
                                      boardId: board.id,
                                      boardName: board.name,
                                    });
                                  }}
                                >
                                  more_vert
                                </Icon>
                              ) : (
                                <Icon
                                  className="text-26"
                                  aria-controls="setting-menu"
                                  onClick={(e) => {
                                    setSettingMenu({
                                      ...settingMenu,
                                      anchorEl: e.currentTarget,
                                      boardId: board.id,
                                      boardName: board.name,
                                    });
                                  }}
                                >
                                  more_vert
                                </Icon>
                              )}
                            </div>
                            <Link
                              to={{
                                pathname: `/apps/scrumboard/boards/${board.id}`,
                              }}
                              className={
                                "flex items-center justify-center" //w-full h-full
                              }
                              style={{
                                paddingBottom: "2.4rem",
                              }}
                              role="button"
                              onClick={() => {
                                // History.push({
                                //   pathname: `/apps/scrumboard/boards/${board.id}`,
                                // });
                              }}
                            >
                              {JSON.parse(board.info).backgroundImage ? (
                                <Typography
                                  className="text-20 font-300 text-center px-32"
                                  style={{
                                    color: "antiquewhite",
                                    fontWeight: 700,
                                  }}
                                >
                                  {board.name}
                                </Typography>
                              ) : (
                                <Typography
                                  className="text-20 font-300 text-center px-32"
                                  style={{ color: "#172b4d", fontWeight: 700 }}
                                >
                                  {board.name}
                                </Typography>
                              )}
                            </Link>
                          </div>
                        </div>
                      ))}
                      <div className={classes.boardContain}>
                        <div
                          className={clsx(
                            classes.board,
                            classes.newBoard,
                            "flex items-center justify-center rounded p-24"
                          )}
                          onClick={() => handleAddNewBoard()}
                        >
                          <Icon className="text-26">add_circle</Icon>
                          <Typography
                            className="text-16 font-300 text-center px-32"
                            color="inherit"
                          >
                            Add new board
                          </Typography>
                        </div>
                      </div>
                    </FuseAnimateGroup>
                  </div>
                </div>
              </Grid>
              {/* <Grid item xs>
          <div
            className={clsx(
              classes.boardSetting,
              "flex flex-grow flex-shrink-0 flex-col"
            )}
          >
            <FuseAnimate>
              <Icon className="text-36">settings</Icon>
            </FuseAnimate>
          </div>
        </Grid>
       */}
              {/* <Grid item xs={1}></Grid> */}
            </Grid>
            <AddNewBoard
              open={addNewBoardLog.open}
              onYes={handleAddNewBoardConfirm}
              onNo={() => {
                setAddNewBoardLog({
                  open: false,
                  value: "",
                  members: [],
                  type: "",
                });
              }}
              addNewBoardLog={addNewBoardLog}
              setAddNewBoardLogValue={setAddNewBoardLog}
            />
            <Menu
              id="setting-menu"
              open={Boolean(settingMenu.anchorEl)}
              anchorEl={settingMenu.anchorEl}
              keepMounted
              onClose={() => {
                setSettingMenu({ ...settingMenu, anchorEl: null });
              }}
            >
              {/* <MenuItem>
          <Icon className="text-26">edit</Icon>{" "}
          <Typography className="text-center px-12" color="inherit">
            Rename
          </Typography>
        </MenuItem> */}
              <MenuItem
                onClick={() => {
                  setMessBox({ ...messBox, delete: true });
                }}
              >
                <Icon className="text-26">delete_forever</Icon>{" "}
                <Typography className="text-center px-12" color="inherit">
                  Delete
                </Typography>
              </MenuItem>
            </Menu>
            <BoardMessBox
              open={messBox.delete}
              title="Are You Sure ? "
              content={`Delete "${settingMenu.boardName}" Board?`}
              onYes={deleteBoard}
              onNo={() => {
                setSettingMenu({ ...settingMenu, anchorEl: null });
                setMessBox({ ...messBox, delete: false });
              }}
              yes="Yes"
              no="No"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default withReducer("scrumboardApp", reducer)(Boards);
