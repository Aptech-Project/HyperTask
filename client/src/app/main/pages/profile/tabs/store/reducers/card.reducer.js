import * as Actions from '../actions';

const initialState = {
  entities: [],
  boards: []
};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CARD_GET_BOARDS: {
      console.log("getBoard: ", action.payload);
      return {
        ...state,
        boards: action.payload,
      }
    }
    default:
      {
        return state;
      }
  }
};
export default cardReducer;