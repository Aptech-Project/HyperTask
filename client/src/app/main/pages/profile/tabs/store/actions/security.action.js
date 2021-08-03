import { endPointApi } from "app/services/endPointAPI"
import axios from "axios";
import { showMessage } from 'app/store/actions/fuse';
import * as loginaction from 'app/auth/store/actions'
import history from "@history";

export const ACTION_TYPES = {
  GETINFO: 'LOGIN',
  FETCH_BY_ID: 'FETCH_BY_ID',
  FETCH_ALL: 'FETCH_ALL',
  UPDATEPASS: 'UPDATEPASS',
}

export const updatePass = (data) => dispatch => {
  console.log("data.id")
  console.log(typeof data.id)
  var formData = new FormData()
  formData.append('id', data.id);
  formData.append('oldpass', data.oldpass);
  formData.append('newpass', data.newpass);
  axios.post(endPointApi.users.updatePass, formData)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.UPDATEPASS,
        payload: res.data
      })
      if (res.status == 200 && res.data == "successful") {
        // dispatch(loginaction.fetchById(res.data.id))
        dispatch(showMessage({ message: 'Update Pass Sussues.Please login again' }));
        dispatch(loginaction.userlogout())
        history.push({
          pathname: "/login",
        });
      } else {
        dispatch(showMessage({ message: 'Old Password incorrect.Please try again' }));
      }
    })
    .catch(err => {
      dispatch(showMessage({ message: 'Old Password incorrect.Please try again' }));
      console.log(err)
    })
}