import { ACTION_TYPES } from "../actions/contact.action";
const initialState = {
  listfriend: [],
  listsend: [],
  listreceive: []
}


const friend = (state = initialState, action) => {

  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_FRIEND:
      return {
        ...state,
        listfriend: [...action.payload]
      }
    case ACTION_TYPES.FETCH_ALL_RECEIVE:
      return {
        ...state,
        listreceive: [...action.payload]
      }
    case ACTION_TYPES.FETCH_ALL_SEND:
      return {
        ...state,
        listsend: [...action.payload]
      }
    default:
      return state
  }
}
export default friend;