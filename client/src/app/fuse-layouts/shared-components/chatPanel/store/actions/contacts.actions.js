import { deserializeObject } from "app/main/common/CommonFunctions";
import { endPointApi } from "app/services/endPointAPI";
import axios from "axios";

export const GET_CONTACTS = "[CHAT PANEL] GET CONTACTS";
export const SET_SELECTED_CONTACT_ID = "[CHAT PANEL] SET SELECTED CONTACT ID";
export const REMOVE_SELECTED_CONTACT_ID = "[CHAT PANEL] REMOVE SELECTED CONTACT ID";
export const GET_ONLINE_USER = "[CHAT PANEL] GET_ONLINE_USER";
export const SET_ONLINE_STATUS = "[CHAT PANEL] SET_ONLINE_STATUS";


export const getContacts = (id) => (dispatch) => {
    axios
        .get(endPointApi.users.fetchById + id)
        .then((response) => {
            const contact = deserializeObject(response.data).contact.map(item => {
                const avatar = "assets/images/avatars/alice.jpg";
                const name = item.id;
                item = {...item, avatar, name}
                return item;
            });
            dispatch({
                type: GET_CONTACTS,
                payload: contact,
            });
        })
        .catch((err) => console.log(err));
};

export function setselectedContactId(contactId) {
    return {
        type: SET_SELECTED_CONTACT_ID,
        payload: contactId,
    };
}

export function removeSelectedContactId() {
    return {
        type: REMOVE_SELECTED_CONTACT_ID,
    };
}

export const getOnlineUser = () => (dispatch) => {
    axios
        .get(endPointApi.common.getOnlineUser)
        .then((response) => {
            dispatch({
                type   : GET_ONLINE_USER,
                payload: response.data
            })
        })
        .catch((err) => console.log(err));
}

