import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
export const ACTION_TYPES = {
    CREATE: 'CREATE',
    FETCH_ALL: 'FETCH_ALL',
}

export const fetchAll = () => dispatch => {
    axios.get(endPointApi.users.getAll)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    axios.post(endPointApi.users.create, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}