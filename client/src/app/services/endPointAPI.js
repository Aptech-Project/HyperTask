const baseApi = "http://localhost:4000/api/";
export const endPointApi = {
  users: {
    getAll: baseApi + "user/get-all-users",
    loginWUP: baseApi + "user/login/",
    create: baseApi + "user/create-user/",
    fetchById: baseApi + "user/get-user/",
  },
  boards: {
    getUserBoards: baseApi + "board/get-user-boards/",
    createBoard: baseApi + "board/create-board",
    getBoard: baseApi + "board/get-board/",
    updateBoard: baseApi + "board/update-board",
  },
};
