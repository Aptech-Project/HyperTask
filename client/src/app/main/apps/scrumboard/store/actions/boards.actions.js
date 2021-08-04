import axios from "axios";
import history from "@history";
import BoardModel from "../../model/BoardModel";
import { endPointApi } from "app/services/endPointAPI";
import { convertBoardProperty } from "../allBoardFunction";

export const GET_BOARDS = "[SCRUMBOARD APP] GET BOARDS";
export const RESET_BOARDS = "[SCRUMBOARD APP] RESET BOARDS";
export const NEW_BOARD = "[SCRUMBOARD APP] NEW BOARD";

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

export function resetBoards() {
  return {
    type: RESET_BOARDS,
  };
}

export function newBoard(board, userName) {
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
          { userId: userID, name: userName, role: "admin", avatar: "" },
        ],
      })
    : new BoardModel({
        members: [
          { userId: userID, name: userName, role: "admin", avatar: "" },
        ],
      });
  const boardConverted = convertBoardProperty(newBoard);
  const request = axios.post(
    `${endPointApi.boards.createBoard}`,
    boardConverted
  );

  return (dispatch) =>
    request.then((response) => {
      console.log("response: ", response);
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
