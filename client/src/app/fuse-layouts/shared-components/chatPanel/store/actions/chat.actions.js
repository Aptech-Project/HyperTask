import axios from "axios";
import { setselectedContactId } from "./contacts.actions";
import { closeMobileChatsSidebar } from "app/main/apps/chat/store/actions/sidebars.actions";
import { FuseUtils } from "@fuse";
import _ from "@lodash";
import { endPointApi } from "app/services/endPointAPI";
import { showMessage } from "app/store/actions/fuse";
import {
    deserializeObject,
    serializeObject,
} from "app/main/common/CommonFunctions";

export const GET_CHAT = "[CHAT APP] GET CHAT";
export const REMOVE_CHAT = "[CHAT APP] REMOVE CHAT";
export const SEND_MESSAGE = "[CHAT APP] SEND MESSAGE";

const getChatData = async (contactId, user) => {
    let chatData;
    const chat = user.conversations.find(
        (_chat) => _chat.contactId == contactId
    );
    const chatId = chat ? chat.chatId : await createNewChat(contactId, user);
    // Get chat data in chat table
    await axios
        .get(`${endPointApi.chat.getChat}${chatId.toString()}`)
        .then((res) => {
            if (res.status == 200) {
                chatData = deserializeObject(res.data);
                console.log("get chat success");
            }
        })
        .catch((err) => console.log(err));
    if (!chat) {
        await axios
            .get(endPointApi.users.fetchById + user.id)
            .then((response) => {
                user = deserializeObject(response.data);
            })
            .catch((err) => console.log(err));
    }
    return {
        chat: chatData,
        userChatData: user.conversations.find(
            (_chat) => _chat.contactId == contactId
        ),
    };
};

async function createNewChat(contactId, user) {
    let chatId = FuseUtils.generateGUID();
    user.conversations = [
        {
            chatId: chatId,
            contactId: contactId,
            lastMessageTime: "",
        },
        ...user.conversations,
    ];
    await axios
        .post(endPointApi.users.update, serializeObject({ ...user }))
        .then((res) => {
            if (res.status == 200) {
                console.log("Update conversations success");
            }
        })
        .catch((err) => console.log(err));
    const newChat = {
        id: chatId,
        dialog: [],
    };

    // Update chat db
    await axios
        .post(endPointApi.chat.createChat, serializeObject({ ...newChat }))
        .then((res) => {
            if (res.status == 200) {
                console.log("Update chat db success");
            }
        })
        .catch((err) => console.log(err));
    return chatId;
}

export function getChat(contactId) {
    return async (dispatch, getState) => {
        const user = getState().chatPanel.user;
        const { chat, userChatData } = await getChatData(contactId, user);

        dispatch(setselectedContactId(contactId));

        dispatch(closeMobileChatsSidebar());

        return dispatch({
            type: GET_CHAT,
            chat: chat,
            userChatData: userChatData,
        });
    };
}

const getChatResponse = {
    chat: {
        id: "2725a680b8d240c011dd2243",
        dialog: [
            {
                who: "5725a680606588342058356d",
                message:
                    "Quickly come to the meeting room 1B, we have a big server issue",
                time: "2017-04-22T01:00:00.299Z",
            },
            {
                who: "5725a6802d10e277a0f35724",
                message:
                    "I’m having breakfast right now, can’t you wait for 10 minutes?",
                time: "2017-04-22T01:05:00.299Z",
            },
            {
                who: "5725a680606588342058356d",
                message: "We are losing money! Quick!",
                time: "2017-04-22T01:10:00.299Z",
            },
        ],
    },
    userChatData: {
        chatId: "2725a680b8d240c011dd2243",
        contactId: "5725a680606588342058356d",
        lastMessageTime: "2017-02-18T10:30:18.931Z",
    },
};

export function removeChat() {
    return {
        type: REMOVE_CHAT,
    };
}

export const sendMessage =
    (messageText, chatId, userId) => async (dispatch, getState) => {
        const message = {
            who: userId,
            message: messageText,
            time: new Date(),
        };

        console.log(getState());

        console.log(message);

        let userChatData = getState().chatPanel.user.conversations.find(
            (item) => item.chatId == chatId
        );
        let chat = getState().chatPanel.chat;
        chat.dialog = [...chat.dialog, message];

        await axios
            .put(endPointApi.chat.updateChat, serializeObject({ ...chat }))
            .then((response) => {
                dispatch({
                    type: SEND_MESSAGE,
                    message: message,
                    userChatData: userChatData,
                });
            })
            .catch((err) => console.log(err));
    };
