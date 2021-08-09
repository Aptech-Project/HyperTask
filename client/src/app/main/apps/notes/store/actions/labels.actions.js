import axios from 'axios';
import { endPointApi } from "app/services/endPointAPI";
import * as loginaction from "app/auth/store/actions";

export const GET_LABELS = '[NOTES APP] GET LABELS';
export const LABELS_DIALOG_OPEN = '[NOTES APP] LABELS DIALOG OPEN';
export const LABELS_DIALOG_CLOSE = '[NOTES APP] LABELS DIALOG CLOSE';
export const UPDATE_LABELS = '[NOTES APP] LABELS UPDATE LABELS';

const userID = localStorage.getItem("user_authenticated");

export function setLabels(labels) {
    return (dispatch) =>
        dispatch({
            type: GET_LABELS,
            payload: labels
        });
}

export const updateLabels = (labels, profile) => (dispatch) => {
    profile.labels = JSON.stringify(Object.values(labels))
    axios
        .post(endPointApi.users.update, profile)
        .then((res) => {
            if (res.status == 200) {
                dispatch(loginaction.fetchById(res.data.id));
            } else {
            }
        })
        .catch((err) => console.log(err));
}

export function openLabelsDialog() {
    return {
        type: LABELS_DIALOG_OPEN
    }
}

export function closeLabelsDialog() {
    return {
        type: LABELS_DIALOG_CLOSE
    }
}
