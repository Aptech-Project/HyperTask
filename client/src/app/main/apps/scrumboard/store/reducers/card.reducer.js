import * as Actions from "../actions";

const initialState = {
  dialogOpen: false,
  data: null,
  attachmentCard: null,
};

const cardReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_CARD_DIALOG: {
      return {
        dialogOpen: true,
        data: action.payload,
      };
    }
    case Actions.UPDATE_CARD: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.REMOVE_CARD: {
      return {
        ...state,
        dialogOpen: false,
        data: action.payload,
      };
    }
    case Actions.CLOSE_CARD_DIALOG: {
      return initialState;
    }
    case Actions.UPDATE_FILE_CARD: {
      return {
        ...state,
        attachmentCard: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cardReducer;
