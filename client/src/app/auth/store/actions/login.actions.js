import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
export const isAuthenticated = (userExitedid) => {
    return {
        type: 'AUTHENTICATE_SIGNAL',
        userExitedid: userExitedid,
    }
}
export const userlogout = () => {
    return {
        type: 'LOGOUT_SIGNAL',
    }
}

export const ACTION_TYPES = {
    LOGIN: 'LOGIN',
    FETCH_BY_ID: 'FETCH_BY_ID',
    CHECK: 'CHECK'
}
export const login = (username, password) => dispatch => {
    axios.post(endPointApi.users.loginWUP + username + '&' + password)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: response.data
            })
        })
        .catch(
            err => console.log(err)
        )
}

export const fetchById = (id) => dispatch => {
    axios.get(endPointApi.users.fetchById + id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const check = () => dispatch => {
    axios.get(endPointApi.users.checkUsernameEmail)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CHECK,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
