import { deserializeObject } from "app/main/common/CommonFunctions";
import { endPointApi } from "app/services/endPointAPI";
import axios from "axios";

export const GET_USER_DATA = "[CHAT PANEL] GET USER DATA";
export const CLEAR_USER_STATE = "[CHAT PANEL] CLEAR_USER_STATE";

export const getUserData = (id) => dispatch => {
    axios.get(endPointApi.users.fetchById + id)
        .then(response => {
            response.data = deserializeObject(response.data);
            dispatch({
                type: GET_USER_DATA,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const clearUserState = () => dispatch => {
    dispatch({
        type: GET_USER_DATA,
    })
}
