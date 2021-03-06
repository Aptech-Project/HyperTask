import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
export const ACTION_TYPES = {
    FETCH_ALL_FRIEND: 'FETCH_ALL_FRIEND',
    FETCH_ALL_SEND: 'FETCH_ALL_SEND',
    FETCH_ALL_RECEIVE: 'FETCH_ALL_RECEIVE',
    FIND_FRIEND_TO_AND: 'FIND_FRIEND_TO_AND',
    SEND_FRIEND: 'SEND_FRIEND',
    ACCEPT_FRIEND: 'ACCEPT_FRIEND',
    REMOVE_FRIEND: 'REMOVE_FRIEND',
    REMOVE_FRIEND_SEND: 'REMOVE_FRIEND_SEND',
    REMOVE_FRIEND_RECEIVE: 'REMOVE_FRIEND_RECEIVE',
    CONTACT_FETCH_BY_ID: 'CONTACT_FETCH_BY_ID'
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
export const searchFriend = (textsearch, id) => dispatch => {
    axios.get(endPointApi.users.searchFriendToAdd + textsearch + "/" + id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FIND_FRIEND_TO_AND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const sendFriend = (idSend, idRecieve, text) => dispatch => {
    axios.post(endPointApi.users.sendFriend + idSend + "&" + idRecieve + "/" + text)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.SEND_FRIEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const acceptFriend = (idSend, idRecieve) => dispatch => {
    axios.post(endPointApi.users.acceptFriend + idSend + "&" + idRecieve)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.ACCEPT_FRIEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const removeFriend = (idSend, idRecieve) => dispatch => {
    axios.post(endPointApi.users.removeFriend + idSend + "&" + idRecieve)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.REMOVE_FRIEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const removeFriendSend = (idSend, idRecieve) => dispatch => {
    axios.post(endPointApi.users.removeFriendSend + idSend + "&" + idRecieve)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.REMOVE_FRIEND_SEND,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const removeFriendReceive = (idSend, idRecieve) => dispatch => {
    axios.post(endPointApi.users.removeFriendReceive + idSend + "&" + idRecieve)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.REMOVE_FRIEND_RECEIVE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const fetchById = (id1, id2) => dispatch => {
    axios.get(endPointApi.users.findFriendByQR + id1 + '&' + id2)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CONTACT_FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}



