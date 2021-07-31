export const convertBoardProperty = (board) => {
  Object.keys(board).forEach((key) => {
    if (typeof board[key] !== "string") {
      board[key] = JSON.stringify(board[key]);
    }
  });
  return board;
};
