import { deserializeObject } from "app/main/common/CommonFunctions";
import { endPointApi } from "app/services/endPointAPI";
import axios from "axios";

export const GET_CONTACTS = "[CHAT PANEL] GET CONTACTS";
export const SET_SELECTED_CONTACT_ID = "[CHAT PANEL] SET SELECTED CONTACT ID";
export const REMOVE_SELECTED_CONTACT_ID =
    "[CHAT PANEL] REMOVE SELECTED CONTACT ID";

// export function getContacts()
// {
//     const request = axios.get('/api/chat/contacts');
//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type   : GET_CONTACTS,
//                 payload: response.data
//             })
//         );
// }

export const getContacts = (id) => (dispatch) => {
    axios
        .get(endPointApi.users.fetchById + id)
        .then((response) => {
            const contact = deserializeObject(response.data).contact.map(item => {
                const avatar = "assets/images/avatars/alice.jpg";
                const name = "test name";
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

const contact = [
    {
        id: "5725a680b3249760ea21de52",
        name: "Alice Freeman",
        avatar: "assets/images/avatars/alice.jpg",
        status: "online",
        mood: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        unread: "2",
    },
    {
        id: "5725a680606588342058356d",
        name: "Arnold",
        avatar: "assets/images/avatars/Arnold.jpg",
        status: "do-not-disturb",
        mood: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        unread: "3",
    },
    {
        id: "5725a68009e20d0a9e9acf2a",
        name: "Barrera",
        avatar: "assets/images/avatars/Barrera.jpg",
        status: "do-not-disturb",
        mood: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        unread: "1",
    },
];
