import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";

export const ACTION_TYPES = {
  GETINFO: 'LOGIN',
  FETCH_BY_ID: 'FETCH_BY_ID',
  FETCH_ALL: 'FETCH_ALL'
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