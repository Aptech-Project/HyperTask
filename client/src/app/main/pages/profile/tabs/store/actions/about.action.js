import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
import { showMessage } from 'app/store/actions/fuse';
import * as loginaction from 'app/auth/store/actions'
export const ACTION_TYPES = {
  GETINFO: 'LOGIN',
  FETCH_BY_ID: 'FETCH_BY_ID',
  FETCH_ALL: 'FETCH_ALL',
  UPDATE: 'UPDATE',
}

export const update = (data) => dispatch => {
  axios.post(endPointApi.users.update, data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data
      })
      if (res.status == 200) {
        dispatch(loginaction.fetchById(res.data.id))
        dispatch(showMessage({ message: 'Update profile Sussues' }));
      } else {
        dispatch(showMessage({ message: 'Update profile Fail' }));
      }
    })
    .catch(err => console.log(err))
}