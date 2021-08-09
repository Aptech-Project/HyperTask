import axios from 'axios';
import { endPointApi } from "app/services/endPointAPI";
import * as loginaction from "app/auth/store/actions";

export const GET_NOTES = '[NOTES APP] GET NOTES';
export const SET_SEARCH_TEXT = '[NOTES APP] SET SEARCH TEXT';
export const OPEN_NOTE_DIALOG = '[NOTES APP] OPEN NOTE DIALOG';
export const CLOSE_NOTE_DIALOG = '[NOTES APP] CLOSE NOTE DIALOG';
export const CREATE_NOTE = '[NOTES APP] CREATE NOTE';
export const UPDATE_NOTE = '[NOTES APP] UPDATE NOTE';
export const REMOVE_NOTE = '[NOTES APP] REMOVE NOTE';
export const TOGGLE_VARIATE_DESC_SIZE = '[NOTES APP] TOGGLE VARIATE DESC SIZE';
const userID = localStorage.getItem("user_authenticated");

// export function getNotes() {
//     const request = axios.get('/api/notes-app/notes');
//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: GET_NOTES,
//                 payload: response.data
//             })
//         );
// }
export function setNotes(notes) {
    return (dispatch) =>
        dispatch({
            type: GET_NOTES,
            payload: notes
        });
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function resetSearchText() {
    return {
        type: SET_SEARCH_TEXT,
        searchText: ""
    }
}

export function toggleVariateDescSize() {
    return {
        type: TOGGLE_VARIATE_DESC_SIZE
    }
}

export function openNoteDialog(id) {
    return {
        type: OPEN_NOTE_DIALOG,
        payload: id
    }
}

export function closeNoteDialog() {
    return {
        type: CLOSE_NOTE_DIALOG
    }
}

export const createNote = (note, profile) => (dispatch) => {
    let notes = JSON.parse(profile.notes)
    const newNote =
    {
        ...note,
        id: notes.length + 1
    };
    let newNotes = [newNote, ...notes]
    console.log("newNotes111")
    console.log(newNotes)
    profile.notes = profile.notes = JSON.stringify(Object.values(newNotes))
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

export const updateNote = (updateNote, profile) => (dispatch) => {
    let notes = JSON.parse(profile.notes)
    let newNotes = notes.map((note) => {
        if (updateNote.id === note.id) {
            return updateNote
        }
        return note
    });
    profile.notes = profile.notes = JSON.stringify(Object.values(newNotes))
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

export const removeNote = (noteId, profile) => (dispatch) => {
    let notes = JSON.parse(profile.notes)
    let newNotes = notes.filter((note) => noteId !== note.id);
    profile.notes = profile.notes = JSON.stringify(Object.values(newNotes))
    axios
        .post(endPointApi.users.update, profile)
        .then((res) => {
            dispatch({
                type: REMOVE_NOTE,
                id: noteId
            })
            if (res.status == 200) {
                dispatch(loginaction.fetchById(res.data.id));
            } else {
            }
        })
        .catch((err) => console.log(err));
}

