import { endPointApi } from "app/services/endPointAPI";
import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import * as loginaction from "app/auth/store/actions";
export const ACTION_TYPES = {
  GETINFO: "LOGIN",
  FETCH_BY_ID: "FETCH_BY_ID",
  PROFILEUPLOADAVATAR: "PROFILEUPLOADAVATAR",
  PROFILEUPDATE: "PROFILEUPDATE",
  PROFILEUPLOADFILE: "PROFILEUPLOADFILE",
  PROFILE_FETCH_ALL_FRIEND: "PROFILE_FETCH_ALL_FRIEND",
};

export const reloadData = () => (dispatch) => {
  dispatch(loginaction.fetchById(localStorage.getItem("user_authenticated")));
}

export const update = (data) => (dispatch) => {
  axios
    .post(endPointApi.users.update, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.PROFILEUPDATE,
        payload: res.data,
      });
      if (res.status == 200) {
        dispatch(loginaction.fetchById(res.data.id));
        dispatch(showMessage({ message: "Update profile Successful", variant: "success" }));
      } else {
        dispatch(showMessage({ message: "Update profile Fail", variant: "error" }));
      }
    })
    .catch((err) => console.log(err));
};

export const uploadFile = (file, account, setIsChangeAvatar) => (dispatch) => {
  var formData = new FormData();
  formData.append("File", file);
  axios
    .post(endPointApi.file.uploadFile, formData)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.PROFILEUPLOADFILE,
        payload: res.data,
      });
      setIsChangeAvatar(true)
    })
    .catch((err) => console.log(err));
};

export const uploadAvatar = (data) => (dispatch) => {
  axios
    .post(endPointApi.users.update, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.PROFILEUPLOADAVATAR,
      });
      if (res.status == 200) {
        dispatch(loginaction.fetchById(res.data.id));
        dispatch(showMessage({ message: "Update avatar Successful", variant: "success" }));
      } else {
        dispatch(showMessage({ message: "Update avatar Fail", variant: "error" }));
      }
    })
    .catch((err) => {
      dispatch({
        type: ACTION_TYPES.PROFILEUPLOADAVATAR,
      });
      console.log(err);
    });
};

export const fetchAllFriend = (id) => dispatch => {
  axios.get(endPointApi.users.getAllFriend + id)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PROFILE_FETCH_ALL_FRIEND,
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}