import { deserializeObject } from "app/main/common/CommonFunctions";
import { endPointApi } from "app/services/endPointAPI";
import axios from "axios";

export const GET_USER_DATA = "[CHAT PANEL] GET USER DATA";

// export function getUserData() {
//     const request = axios.get("/api/chat/user");

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: GET_USER_DATA,
//                 payload: response.data,
//             })
//         );
// }

export const getUserData = (id) => dispatch => {
    axios.get(endPointApi.users.fetchById + id)
        .then(response => {
            response.data = deserializeObject(response.data);
            dispatch({
                type: GET_USER_DATA,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

const responseData = {
    id: "5725a6802d10e277a0f35724",
    name: "John Doe",
    avatar: "assets/images/avatars/profile.jpg",
    status: "online",
    mood: "it's a status....not your diary...",
    chatList: [
        {
            chatId: "1725a680b3249760ea21de52",
            contactId: "5725a680b3249760ea21de52",
            lastMessageTime: "2017-06-12T02:10:18.931Z",
        },
        {
            chatId: "2725a680b8d240c011dd2243",
            contactId: "5725a680606588342058356d",
            lastMessageTime: "2017-02-18T10:30:18.931Z",
        },
        {
            chatId: "3725a6809413bf8a0a5272b4",
            contactId: "5725a68009e20d0a9e9acf2a",
            lastMessageTime: "2017-03-18T12:30:18.931Z",
        },
    ],
};
