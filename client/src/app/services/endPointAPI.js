const baseApi = 'http://localhost:4000/api/user';
export const endPointApi = {
    users: {
        getAll: baseApi + '/get-all-users',
        loginWUP: baseApi + '/login/',
        create: baseApi + '/create-user/',
        fetchById: baseApi + '/get-user/',
    },
    boards: {
        getUserBoards: baseApi + '/get-user-boards/',
    }
}