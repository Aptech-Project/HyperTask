const baseApi = "http://localhost:4000/api/";
export const endPointApi = {
  users: {
    getAll: baseApi + "user/get-all-users",
    loginWUP: baseApi + "user/login/",
    create: baseApi + "user/create-user/",
    update: baseApi + "user/update-user/",
    fetchById: baseApi + "user/get-user/",
    checkUsernameEmail: baseApi + "user/check/",
    updatePass: baseApi + "user/update-pass/",
    getAllFriend: baseApi + "user/get-all-friend/",
    getContactRequest: baseApi + "user/get-send-friend/",
    getContactSend: baseApi + "user/get-receive-friend/",
    searchFriendToAdd: baseApi + "user/search-friend/",
    sendFriend: baseApi + "user/send-friend-invitation/",
    acceptFriend: baseApi + "user/accept-friend/",
    removeFriend: baseApi + "user/remove-friend/",
    removeFriendSend: baseApi + "user/remove-friend-send/",
    removeFriendReceive: baseApi + "user/remove-friend-receive/",
  },
  boards: {
    getUserBoards: baseApi + "board/get-user-boards/",
    createBoard: baseApi + "board/create-board",
    getBoard: baseApi + "board/get-board/",
    updateBoard: baseApi + "board/update-board",
    deleteBoard: baseApi + "board/delete-board/",
  },
  file: {
    uploadFile: baseApi + "file/upload-file",
  },
  chat: {
    createChat: baseApi + "chat/create-chat",
    getChat: baseApi + "chat/get-chat/",
    updateChat: baseApi + "chat/update-chat/",
  },
  common: {
    getOnlineUser: baseApi + "common/get-common/ONLINE_USER",
    updateCommonData: baseApi + "common/update-common",
  },
};
