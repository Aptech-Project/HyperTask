import axios from "axios";
import { FuseUtils } from "@fuse";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "app/store/actions/fuse";
import reorder, { reorderQuoteMap } from "./reorder";
import * as Actions from "./index";
import ListModel from "../../model/ListModel";
import CardModel from "../../model/CardModel";
import BoardActivityModel from "../../model/BoardActivityModel";
import { endPointApi } from "app/services/endPointAPI";
import { convertBoardProperty, userIsAdmin } from "../allBoardFunction";

export const GET_BOARD = "[SCRUMBOARD APP] GET BOARD";
export const DELETE_BOARD = "[SCRUMBOARD APP] DELETE BOARD";
export const COPY_BOARD = "[SCRUMBOARD APP] COPY BOARD";
export const RENAME_BOARD = "[SCRUMBOARD APP] RENAME BOARD";
export const CHANGE_BOARD_SETTINGS = "[SCRUMBOARD APP] CHANGE BOARD SETTINGS";
export const RESET_BOARD = "[SCRUMBOARD APP] RESET BOARD";
export const ORDER_LIST = "[SCRUMBOARD APP] ORDER LIST";
export const ORDER_CARD = "[SCRUMBOARD APP] ORDER CARD";
export const ADD_CARD = "[SCRUMBOARD APP] ADD CARD";
export const ADD_LIST = "[SCRUMBOARD APP] ADD LIST";
export const ADD_LABEL = "[SCRUMBOARD APP] ADD LABEL";
export const RENAME_LIST = "[SCRUMBOARD APP] RENAME LIST";
export const REMOVE_LIST = "[SCRUMBOARD APP] REMOVE LIST";
export const UPDATE_MEMBER = "[SCRUMBOARD APP] UPDATE MEMBER";
export const NOT_UPDATE = "[SCRUMBOARD APP] NOT UPDATE";

export function getBoard(params) {
  const request = axios.get(`${endPointApi.boards.getBoard}${params}`);

  return (dispatch) =>
    request.then(
      (response) =>
        dispatch({
          type: GET_BOARD,
          payload: response.data,
        }),
      (error) => {
        dispatch(
          showMessage({
            message: error.response.data,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
        history.push({
          pathname: "/apps/scrumboard/boards",
        });
      }
    );
}

export function resetBoard() {
  return {
    type: RESET_BOARD,
  };
}

export function reorderList(result) {
  return (dispatch, getState) => {
    const { board } = getState().scrumboardApp;
    const lists = JSON.parse(board.lists);
    const userisAdmin = userIsAdmin(board);
    const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
    //console.log("userisAdmin: ", userisAdmin);
    if (userisAdmin == false && allowMemberEdit === "false") {
      alert("Member cannot Edit");
    } else {
      const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: "Reorder List"});
      oldActivity.unshift({...newActivity});
      //console.log("newActivities: ", oldActivity);
      const ordered = reorder(
        lists,
        result.source.index,
        result.destination.index
      );
      const boardUpdate = { ...board, lists: ordered, activities: oldActivity };
      const boardConverted = convertBoardProperty(boardUpdate);
      const request = axios.put(
        `${endPointApi.boards.updateBoard}`,
        boardConverted
      );

      request.then((response) => {
        dispatch(
          showMessage({
            message: "List Order Saved",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });

      return dispatch({
        type: ORDER_LIST,
        payload: ordered,
      });
    }
  };
}

export function reorderCard(result) {
  return (dispatch, getState) => {
    const { board } = getState().scrumboardApp;
    const lists = JSON.parse(board.lists);
    const userisAdmin = userIsAdmin(board);
    const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
    if (userisAdmin == false && allowMemberEdit === "false") {
      alert("Member cannot Edit");
    } else {
      const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: "Reorder Card"});
      oldActivity.unshift({...newActivity});
      const ordered = reorderQuoteMap(lists, result.source, result.destination);
      const boardUpdate = { ...board, lists: ordered, activities: oldActivity };
      const boardConverted = convertBoardProperty(boardUpdate);
      const request = axios.put(
        `${endPointApi.boards.updateBoard}`,
        boardConverted
      );
      request.then((response) => {
        dispatch(
          showMessage({
            message: "Card Order Saved",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
      return dispatch({
        type: ORDER_CARD,
        payload: ordered,
      });
    }
  };
}

export function newCard(board, listId, cardTitle) {
  const user = localStorage.getItem("user_authenticated");
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  if (userisAdmin == false && allowMemberEdit === "false") {
    alert("Member cannot Edit");
    window.location.reload();
  } else {
    const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: `Create Card ${cardTitle}`});
      oldActivity.unshift({...newActivity});
    const listAddCardIndex = JSON.parse(board.lists).findIndex(
      (list) => list.id == listId
    );
    const listAddCard = JSON.parse(board.lists)[listAddCardIndex];
    const cardID = `${listId}C${listAddCard.cards.length + 1}`;
    const data = new CardModel({ id: cardID, name: cardTitle, author: user });
    const newCardList = [...listAddCard.cards];
    newCardList.push({ ...data });
    const listUpdate = { ...listAddCard, cards: newCardList };
    const allListUpdated = JSON.parse(board.lists).map((list) => {
      if (list.id === listId) {
        list = listUpdate;
      }
      return list;
    });
    const boardUpdate = { ...board, lists: allListUpdated, activities: oldActivity };
    const boardConverted = convertBoardProperty(boardUpdate);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );
    return (dispatch) =>
      new Promise((resolve, reject) => {
        request.then((response) => {
          resolve(response.data);
          //console.log("response: ", response);
          return dispatch({
            type: ADD_CARD,
            payload: response.data,
          });
        });
      });
  }
}

export function newList(board, listTitle) {
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  if (userisAdmin == false && allowMemberEdit === "false") {
    alert("Member cannot Edit");
    window.location.reload();
  } else {
    const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: `Create List ${listTitle}`});
      oldActivity.unshift({...newActivity});
    const listID = `L${JSON.parse(board.lists).length + 1}`;
    const data = new ListModel({ id: listID, name: listTitle });
    const newList = [...JSON.parse(board.lists)];
    newList.push({ ...data });
    const boardUpdate = { ...board, lists: newList, activities: oldActivity };
    const boardConverted = convertBoardProperty(boardUpdate);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );
    return (dispatch) =>
      request.then((response) =>
        dispatch({
          type: ADD_LIST,
          payload: response.data,
        })
      );
  }
}

export function renameList(board, listId, listTitle) {
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  if (userisAdmin == false && allowMemberEdit === "false") {
    alert("Member cannot Edit");
    window.location.reload();
  } else {
    const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: `Rename List ${listTitle}`});
      oldActivity.unshift({...newActivity});
    const listToRename = JSON.parse(board.lists).find(
      (list) => list.id === listId
    );
    const listRenamed = { ...listToRename, name: listTitle };
    const listUpdated = JSON.parse(board.lists).map((list) => {
      if (list.id === listId) {
        list = listRenamed;
      }
      return list;
    });
    //console.log("boardUpdated: ", boardUpdated);
    const boardUpdate = { ...board, lists: listUpdated, activities: oldActivity };
    const boardConverted = convertBoardProperty(boardUpdate);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );
    return (dispatch) =>
      request.then((response) =>
        dispatch({
          type: RENAME_LIST,
          payload: response.data,
        })
      );
  }
}

export function removeList(board, listId, listTitle) {
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  if (userisAdmin == false && allowMemberEdit === "false") {
    alert("Member cannot Edit");
    window.location.reload();
  } else {
    const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: `Remove List ${listTitle}`});
      oldActivity.unshift({...newActivity});
    const listAfterDelete = JSON.parse(board.lists).filter(
      (list) => list.id !== listId
    );
    //console.log("listAfterDelete: ", listAfterDelete);
    const boardUpdate = { ...board, lists: listAfterDelete, activities: oldActivity };
    const boardConverted = convertBoardProperty(boardUpdate);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );
    return (dispatch) =>
      request.then((response) =>
        dispatch({
          type: REMOVE_LIST,
          payload: response.data,
        })
      );
  }
}

export function addLabel(label) {
  //console.log("label: ", { ...label });
  return (dispatch) => {
    return dispatch({
      type: ADD_LABEL,
      payload: { ...label },
    });
  };
}

export function changeBoardSettings(newSettings) {
  return (dispatch, getState) => {
    const { board } = getState().scrumboardApp;
    //const boardInfo = JSON.parse(board.info);
    // const settingName = newSettings.name
    // const infoUpdate = {...boardInfo, }
    const settings = _.merge(JSON.parse(board.info), newSettings);
    const boardUpdate = { ...board, info: settings };
    const boardConverted = convertBoardProperty(boardUpdate);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );

    return request.then((response) =>
      dispatch({
        type: CHANGE_BOARD_SETTINGS,
        payload: response.data,
      })
    );
  };
}

export function deleteBoard(boardId) {
  const request = axios.post("/api/scrumboard-app/board/delete", {
    boardId,
  });

  return (dispatch) =>
    request.then((response) => {
      history.push({
        pathname: "/apps/scrumboard/boards",
      });
      return dispatch({
        type: DELETE_BOARD,
      });
    });
}

export function copyBoard(board) {
  const newBoard = _.merge(board, {
    name: board.name + " (Copied)",
  });
  return (dispatch) => {
    dispatch(Actions.newBoard(newBoard));
    return { type: COPY_BOARD };
  };
}

export function renameBoard(board, boardTitle) {
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  if (userisAdmin == false && allowMemberEdit === "false") {
    alert("Member cannot Edit");
    window.location.reload();
  } else {
    const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: `Rename Board`});
      oldActivity.unshift({...newActivity});
    const boardRenamed = { ...board, name: boardTitle, activities: oldActivity };
    //console.log("boardRenamed: ", boardRenamed);
    const boardConverted = convertBoardProperty(boardRenamed);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );

    return (dispatch) =>
      request.then((response) =>
        dispatch({
          type: RENAME_BOARD,
          boardTitle,
        })
      );
  }
}

export function updateMember(board, members) {
  const userisAdmin = userIsAdmin(board);
  const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
  if (userisAdmin == false && allowMemberEdit === "false") {
    alert("Member cannot Edit");
    window.location.reload();
  } else {
    const user = localStorage.getItem("user_authenticated");
      const oldActivity = JSON.parse(board.activities);
      const newActivity = new BoardActivityModel({idMember: user, message: `New member has been add to this board`});
      oldActivity.unshift({...newActivity});
    const memberListToUpdate = JSON.parse(board.members);
    members.map((mem) => {
      memberListToUpdate.push(mem);
    });
    const boardRenamed = { ...board, members: memberListToUpdate, activities: oldActivity };
    //console.log("boardRenamed: ", boardRenamed);
    const boardConverted = convertBoardProperty(boardRenamed);
    const request = axios.put(
      `${endPointApi.boards.updateBoard}`,
      boardConverted
    );

    return (dispatch) =>
      request.then((response) =>
        dispatch({
          type: UPDATE_MEMBER,
          payload: response.data,
        })
      );
  }
}
