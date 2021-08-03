import * as Actions from '../actions';

const initialState = {
  list: []
};

const contactReducer = (state = initialState, action) => {

  switch (action.type) {
    case Actions.ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    default:
      return state
  }
}
export default contactReducer;