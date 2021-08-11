import { truncate } from "lodash";
import { ACTION_TYPES } from "../actions/contact.action";
const initialState = {
  listfriend: [],
  listsend: [],
  listreceive: [],
  listsearchfriend: [],
  findId: null
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
    case ACTION_TYPES.FIND_FRIEND_TO_AND:
      return {
        ...state,
        listsearchfriend: [...action.payload]
      }
    case ACTION_TYPES.SEND_FRIEND:
      return {
        ...state,
        listsearchfriend: [...action.payload]
      }
    case ACTION_TYPES.ACCEPT_FRIEND:
      return {
        ...state,
        listsend: [...action.payload]
      }
    case ACTION_TYPES.REMOVE_FRIEND:
      return {
        ...state,
        listfriend: [...action.payload]
      }
    case ACTION_TYPES.REMOVE_FRIEND_SEND:
      return {
        ...state,
        listreceive: [...action.payload]
      }
    case ACTION_TYPES.REMOVE_FRIEND_RECEIVE:
      return {
        ...state,
        listsend: [...action.payload]
      }
    case ACTION_TYPES.CONTACT_FETCH_BY_ID:
      return {
        ...state,
        findId: action.payload
      }
    default:
      return state
  }
}
export default friend;