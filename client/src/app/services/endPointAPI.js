const baseApi = 'http://localhost:4000/api/';
export const endPointApi = {
    users: {
        getAll: baseApi + 'user/get-all-users',
        loginWUP: baseApi + 'user/login/',
        create: baseApi + 'user/create-user/',
        update: baseApi + 'user/update-user/',
        fetchById: baseApi + 'user/get-user/',
        checkUsernameEmail: baseApi + 'user/check/',
        updatePass: baseApi + 'user/update-pass/',
        getAllFriend: baseApi + 'user/get-all-friend/',
        getContactRequest: baseApi + 'user/get-send-friend/',
        getContactSend: baseApi + 'user/get-receive-friend/'
    },
    boards: {
        getUserBoards: baseApi + 'board/get-user-boards/',
    },
    file: {
        uploadFile: baseApi + "file/upload-file",
    }
}