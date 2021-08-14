import * as Actions from "../actions";

const initialState = {
  allUser: [],
  allUserCollect: [],
};

const userBoardsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_USERS_BOARD: {
      //console.log("GET_ALL_USERS_BOARD: ", action.payload);
      return {
        ...state,
        allUser: [...action.payload],
      };
    }
    case Actions.ALL_USERS_BOARD_COLLECT: {
      //console.log("GET_ALL_USERS_BOARD: ", action.payload);
      return {
        ...state,
        allUserCollect: [...action.payload],
      };
    }
    case Actions.RESET_USER_BOARD: {
      return {
        allUser: [],
        allUserCollect: [],
      };
    }
    default:
      return state;
  }
};

export default userBoardsReducer;
