import * as Actions from '../actions';

const initialState = {
  list: [],
  uploadData: {},
};

const contactReducer = (state = initialState, action) => {

  switch (action.type) {
    case Actions.ACTION_TYPES.PROFILEUPLOADFILE:
      return {
        ...state,
        uploadData: action.payload
      }
    case Actions.ACTION_TYPES.PROFILEUPDATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    default:
      return state
  }
}
export default contactReducer;