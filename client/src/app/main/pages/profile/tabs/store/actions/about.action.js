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
};

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
        dispatch(showMessage({ message: "Update profile Successful" }));
      } else {
        dispatch(showMessage({ message: "Update profile Fail" }));
      }
    })
    .catch((err) => console.log(err));
};

export const uploadFile = (file, account) => (dispatch) => {
  var formData = new FormData();
  formData.append("File", file);
  axios
    .post(endPointApi.file.uploadFile, formData)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.PROFILEUPLOADFILE,
        payload: res.data,
      });
      // if (res.status == 200) {
      //   account.info = JSON.parse(account.info)
      //   account.info.avatar = res.data.fileUrl
      //   account.info = JSON.stringify(account.info)
      //   dispatch(update(account))
      // }
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
        dispatch(showMessage({ message: "Update avatar Successful" }));
      } else {
        dispatch(showMessage({ message: "Update avatar Fail" }));
      }
    })
    .catch((err) => {
      dispatch({
        type: ACTION_TYPES.PROFILEUPLOADAVATAR,
      });
      console.log(err);
    });
};
