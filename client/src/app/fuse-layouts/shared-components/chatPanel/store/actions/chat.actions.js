import axios from "axios";
import { setselectedContactId } from "./contacts.actions";
import { FuseUtils } from "@fuse";
import _ from "@lodash";
import { endPointApi } from "app/services/endPointAPI";
import {
    deserializeObject,
    serializeObject,
} from "app/main/common/CommonFunctions";
import { closeMobileChatsSidebar } from "./sidebars.actions";

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
    // Create new user conversations
    await axios
        .post(endPointApi.users.update, serializeObject({ ...user }))
        .then((res) => {})
        .catch((err) => console.log(err));
    const newChat = {
        id: chatId,
        dialog: [],
    };

    // Also create new friend conversations
    // 1. Find friend data
    let friend = null;
    await axios
        .get(endPointApi.users.fetchById + contactId)
        .then(async (response) => {
            friend = deserializeObject(response.data);
            // 2. Update conversation data for friend
            friend.conversations = [
                {
                    chatId: chatId,
                    contactId: user.id,
                    lastMessageTime: "",
                },
                ...friend.conversations,
            ];
            await axios
                .post(endPointApi.users.update, serializeObject({ ...friend }))
                .then((res) => {})
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

    // Update chat db
    await axios
        .post(endPointApi.chat.createChat, serializeObject({ ...newChat }))
        .then((res) => {})
        .catch((err) => console.log(err));
    return chatId;
}

export function getChat(contactId) {
    return async (dispatch, getState) => {
        let user;
        const currentUserId = getState().chatPanel.user.id;
        await axios
            .get(endPointApi.users.fetchById + currentUserId)
            .then(async (response) => {
                user = deserializeObject(response.data);
            })
            .catch((err) => console.log(err));
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
