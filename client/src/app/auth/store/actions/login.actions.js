import { endPointApi } from "app/services/endPointAPI"
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
}
export const login = (username, password) => dispatch => {
    endPointApi.user().loginWUP(username, password)
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
    endPointApi.user().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
