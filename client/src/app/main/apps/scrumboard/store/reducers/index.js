import { combineReducers } from "redux";
import boards from "./boards.reducer";
import board from "./board.reducer";
import card from "./card.reducer";
import userBoard from "./userBoard.reducer";

const scrumboardAppReducers = combineReducers({
  boards,
  board,
  card,
  userBoard,
});

export default scrumboardAppReducers;
