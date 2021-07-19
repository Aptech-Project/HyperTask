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

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  board: {
    cursor: "pointer",
    boxShadow: theme.shadows[0],
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
}));

function Boards(props) {
  const dispatch = useDispatch();
  const boards = useSelector(({ scrumboardApp }) => scrumboardApp.boards);
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
  });
  const [messBox, setMessBox] = useState({
    delete: false,
  });

  useEffect(() => {
    if (searchValue === "") {
      setSearchResult([...boards]);
    } else {
      const results = boards.filter((board) =>
        board.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResult(results);
    }
  }, [boards, searchValue]);

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getBoards());
    return () => {
      dispatch(Actions.resetBoards());
    };
  }, [dispatch]);

  const handleAddNewBoard = () => {
    setAddNewBoardLog({ ...addNewBoardLog, open: true });
  };
  const handleAddNewBoardConfirm = () => {
    dispatch(Actions.newBoard({ name: addNewBoardLog.value }));
  };
  const deleteBoard = () => {
    dispatch(Actions.deleteBoard(settingMenu.boardId));
    //dispatch(Actions.getBoards());
    const allBoards = boards.filter(
      (board) => board.id !== settingMenu.boardId
    );
    setSearchResult(allBoards);
    setSettingMenu({ ...settingMenu, anchorEl: null });
    setMessBox({ ...messBox, delete: false });
  };

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-grow flex-shrink-0 flex-col items-center"
      )}
    >
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={10}>
          <div className="flex flex-grow flex-shrink-0 flex-col container px-16 md:px-24">
            {/* <FuseAnimate> */}
            <Typography
              className=" text-32 sm:text-40 font-300" /* sm:mt-88 sm:py-24 */
              style={{ color: "#5e6c84" }}
            >
              Your Boards
            </Typography>
            {/* </FuseAnimate> */}
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
                    <div className={clsx(classes.board, "rounded")}>
                      <div className={classes.settingBoardContain}>
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
                      </div>
                      <Link
                        to={
                          "/apps/scrumboard/boards/" +
                          board.id +
                          "/" +
                          board.uri
                        }
                        className={
                          "flex items-center justify-center" //w-full h-full
                        }
                        style={{ paddingBottom: "2.4rem" }}
                        role="button"
                      >
                        <Typography className="text-16 font-300 text-center px-32">
                          {board.name}
                        </Typography>
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
      </Grid>
      <AddNewBoard
        open={addNewBoardLog.open}
        onYes={handleAddNewBoardConfirm}
        onNo={() => {
          setAddNewBoardLog({ ...addNewBoardLog, open: false });
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
  );
}

export default withReducer("scrumboardApp", reducer)(Boards);
