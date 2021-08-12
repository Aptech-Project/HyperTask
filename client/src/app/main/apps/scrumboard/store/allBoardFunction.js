export const convertBoardProperty = (board) => {
  Object.keys(board).forEach((key) => {
    if (typeof board[key] !== "string") {
      board[key] = JSON.stringify(board[key]);
    }
  });
  return board;
};
export const userIsAdmin = (board) => {
  if (board) {
    const userId = localStorage.getItem("user_authenticated");
    let userisAdmin = false;
    JSON.parse(board.members).map((member) => {
      if (member.userId === userId && member.role === "admin") {
        userisAdmin = true;
      }
    });
    return userisAdmin;
  }
};
