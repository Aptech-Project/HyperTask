import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
export const ACTION_TYPES = {
    FETCH_ALL_FRIEND: 'FETCH_ALL_FRIEND',
    FETCH_ALL_SEND: 'FETCH_ALL_SEND',
    FETCH_ALL_RECEIVE: 'FETCH_ALL_RECEIVE',
    FIND_FRIEND_TO_AND: 'FIND_FRIEND_TO_AND',
    SEND_FRIEND: 'SEND_FRIEND'
}


export const fetchAllFriend = (id) => dispatch => {
    axios.get(endPointApi.users.getAllFriend + id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_FRIEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const fetchSendFriend = (id) => dispatch => {
    axios.get(endPointApi.users.getContactSend + id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_SEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const fetchReceiveFriend = (id) => dispatch => {
    axios.get(endPointApi.users.getContactRequest + id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_RECEIVE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const searchFriend = (textsearch) => dispatch => {
    axios.get(endPointApi.users.searchFriendToAdd + textsearch)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FIND_FRIEND_TO_AND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const sendFriend = (idSend, idRecieve) => dispatch => {
    axios.post(endPointApi.users.sendFriend + idSend + "&" + idRecieve)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.SEND_FRIEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

