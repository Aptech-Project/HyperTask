import * as Actions from "../actions";
import _ from "@lodash";

const initialState = null;

const boardReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOARD: {
      return {
        ...action.payload,
      };
    }
    case Actions.RESET_BOARD: {
      return initialState;
    }
    case Actions.ORDER_LIST: {
      return {
        ...state,
        lists: JSON.stringify(action.payload),
      };
    }
    case Actions.ORDER_CARD: {
      return {
        ...state,
        lists: JSON.stringify(action.payload),
      };
    }
    case Actions.ADD_LIST: {
      return {
        ...action.payload,
      };
    }
    case Actions.ADD_CARD: {
      return {
        ...action.payload,
      };
    }
    case Actions.ADD_LABEL: {
      const labelUpdate = JSON.parse(state.labels);
      labelUpdate.push(action.payload);
      return {
        ...state,
        labels: JSON.stringify(labelUpdate),
      };
    }
    case Actions.UPDATE_CARD: {
      return {
        ...state,
        lists: JSON.stringify(action.payload),
      };
    }
    case Actions.REMOVE_CARD: {
      return {
        ...state,
        lists: JSON.stringify(action.payload),
      };
    }
    case Actions.RENAME_LIST: {
      return {
        ...action.payload,
      };
    }
    case Actions.REMOVE_LIST: {
      return {
        ...action.payload,
      };
    }
    case Actions.CHANGE_BOARD_SETTINGS: {
      return {
        ...action.payload,
      };
    }
    case Actions.DELETE_BOARD: {
      return initialState;
    }
    case Actions.RENAME_BOARD: {
      return {
        ...state,
        name: action.boardTitle,
      };
    }
    case Actions.MEMBER_DELETE_BOARD: {
      return {
        ...action.payload,
      };
    }
    case Actions.UPDATE_MEMBER: {
      return {
        ...action.payload,
      };
    }
    case Actions.NOT_UPDATE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
