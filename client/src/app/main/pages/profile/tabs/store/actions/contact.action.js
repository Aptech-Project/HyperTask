import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
export const ACTION_TYPES = {
    FETCH_ALL_FRIEND: 'FETCH_ALL_FRIEND',
    FETCH_ALL_SEND: 'FETCH_ALL_SEND',
    FETCH_ALL_RECEIVE: 'FETCH_ALL_RECEIVE'
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

