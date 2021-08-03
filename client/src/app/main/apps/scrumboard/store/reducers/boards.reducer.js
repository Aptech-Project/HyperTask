import { dataBoard } from "../../dataBoardFake/data";
import * as Actions from "../actions";

const initialState = [];

const boardsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOARDS: {
      console.log("getBoard: ", action.payload);
      return [...action.payload];
      //return dataBoard().board;
    }
    case Actions.NEW_BOARD: {
      return [...state, action.board];
    }
    case Actions.RESET_BOARDS: {
      return [];
    }
    default:
      return state;
  }
};

export default boardsReducer;
