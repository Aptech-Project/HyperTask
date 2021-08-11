import axios from 'axios';
import { endPointApi } from "app/services/endPointAPI";

export const CARD_GET_BOARDS = "CARD_GET_BOARDS";

export function getBoards() {
  const userID = localStorage.getItem("user_authenticated");
  const request = axios.get(`${endPointApi.boards.getUserBoards}${userID}`);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: CARD_GET_BOARDS,
        payload: response.data,
      })
    );
}
