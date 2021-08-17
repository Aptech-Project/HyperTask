import axios from "axios";
import history from "@history";
import BoardModel from "../../model/BoardModel";
import { endPointApi } from "app/services/endPointAPI";
import { convertBoardProperty } from "../allBoardFunction";

export const GET_BOARDS = "[SCRUMBOARD APP] GET BOARDS";
export const RESET_BOARDS = "[SCRUMBOARD APP] RESET BOARDS";
export const NEW_BOARD = "[SCRUMBOARD APP] NEW BOARD";
export const ADMIN_DELETE_BOARD = "[SCRUMBOARD APP] ADMIN_DELETE_BOARD";
export const MEMBER_DELETE_BOARD = "[SCRUMBOARD APP] MEMBER_DELETE_BOARD";
export const GET_ALL_USERS_BOARD = "[SCRUMBOARD APP] GET_ALL_USERS_BOARD";
export const ALL_USERS_BOARD_COLLECT =
  "[SCRUMBOARD APP] ALL_USERS_BOARD_COLLECT";
export const RESET_USER_BOARD = "[SCRUMBOARD APP] RESET_USER_BOARD";

export function getBoards() {
  //const request = axios.get("/api/scrumboard-app/boards");
  const userID = localStorage.getItem("user_authenticated");
  const request = axios.get(`${endPointApi.boards.getUserBoards}${userID}`);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BOARDS,
        payload: response.data,
      })
    );
}

export function getAllUserBoard() {
  const request = axios.get(endPointApi.users.getAll);

  return (dispatch) =>
    request
      .then((response) =>
        dispatch({
          type: GET_ALL_USERS_BOARD,
          payload: response.data,
        })
      )
      .catch((error) => console.log(error));
}
export function allUserBoardCollect(allUser) {
  return {
    type: ALL_USERS_BOARD_COLLECT,
    payload: allUser,
  };
}
export function resetUserBoards() {
  return {
    type: RESET_USER_BOARD,
  };
}

export function resetBoards() {
  return {
    type: RESET_BOARDS,
  };
}

export function newBoard(board) {
  //const newBoardId = userAllBoardLength + 1;
  const userID = localStorage.getItem("user_authenticated");
  // const boardMember = [
  //   ...board.members,
  //   { userId: userID, role: "admin", avatar: "" },
  // ];
  const newBoard = board
    ? new BoardModel({
        /* id: newBoardId, */
        name: board.name,
        members: [
          ...board.members,
          {
            userId: userID,
            role: "admin",
            status: "Stay",
          },
        ],
      })
    : new BoardModel({
        members: [
          {
            userId: userID,
            role: "admin",
            status: "Stay",
          },
        ],
      });
  const boardConverted = convertBoardProperty(newBoard);
  const request = axios.post(
    `${endPointApi.boards.createBoard}`,
    boardConverted
  );

  return (dispatch) =>
    request.then((response) => {
      const board = response.data;
      history.push({
        pathname: "/apps/scrumboard/boards/" + board.id,
      });
      return dispatch({
        type: NEW_BOARD,
        board,
      });
    });
}

export function newBoardTemplate(board) {
  //const newBoardId = userAllBoardLength + 1;
  const userID = localStorage.getItem("user_authenticated");

  // const boardMember = [
  //   ...board.members,
  //   { userId: userID, role: "admin", avatar: "" },
  // ];
  const newBoard = board
    ? new BoardModel({
        /* id: newBoardId, */
        name: board.name,
        members: [
          ...board.members,
          {
            userId: userID,
            role: "admin",
            status: "Stay",
          },
        ],
        lists: board.lists,
      })
    : new BoardModel({
        members: [
          {
            userId: userID,
            role: "admin",
            status: "Stay",
          },
        ],
        lists: board.lists,
      });
  const boardConverted = convertBoardProperty(newBoard);
  const request = axios.post(
    `${endPointApi.boards.createBoard}`,
    boardConverted
  );

  return (dispatch) =>
    request.then((response) => {
      const board = response.data;
      history.push({
        pathname: "/apps/scrumboard/boards/" + board.id,
      });
      return dispatch({
        type: NEW_BOARD,
        board,
      });
    });
}

export function adminDeleteBoard(boardId, userId) {
  //console.log("adminDeleteBoard");
  const request = axios.put(
    `${endPointApi.boards.deleteBoard}${parseInt(userId)}&${parseInt(boardId)}`
  );
  return (dispatch) =>
    request.then((response) => {
      //console.log("response.data: ", response.data);
      return dispatch({
        type: ADMIN_DELETE_BOARD,
        payload: response.data,
      });
    });
}

export function memberDeleteBoard(board, userId) {
  //console.log("memberDeleteBoard");
  const memberList = JSON.parse(board.members);
  let memberToUpdate = memberList.find((member) => member.userId === userId);
  memberToUpdate = { ...memberToUpdate, status: "Out" };
  const memberUpdate = memberList.map((member) => {
    if (member.userId === memberToUpdate.userId) {
      member = memberToUpdate;
    }
    return member;
  });

  const boardUpdate = { ...board, members: memberUpdate };
  const boardConverted = convertBoardProperty(boardUpdate);
  const request = axios.put(
    `${endPointApi.boards.updateBoard}`,
    boardConverted
  );
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: MEMBER_DELETE_BOARD,
        payload: response.data,
      })
    );
}
