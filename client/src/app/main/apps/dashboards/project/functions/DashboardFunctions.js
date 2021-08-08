import {allBoards} from './AllBoardsMockData';
export const getBoardsStatistic = () => {
    const boardsStatistic = {};
    const allBoardsClone = [...allBoards];
	// List of project
	allBoardsClone.forEach(board => {
		boardsStatistic[board.name] = {};
        // Get board cards
		if (board.lists.length) {
            let allCards = [];
            board.lists.forEach(list => {
                allCards = [...allCards, ...list.cards];
            })
            // All cards
            boardsStatistic[board.name].allCards = allCards;

            // Overdue cards
            boardsStatistic[board.name].overdueCards = [];
            // Doing cards
            boardsStatistic[board.name].doingCards = [];
            // Completed after duedate
            boardsStatistic[board.name].completeAfterDueCards = [];
            // Completed before duedate
            boardsStatistic[board.name].completeBeforeDueCards = [];
            if (allCards.length) {
                boardsStatistic[board.name].overdueCards = allCards.filter(card => !card.isDone && (Date.now() >  (card.due ? new Date(card.due) : Date.now())));
                boardsStatistic[board.name].doingCards = allCards.filter(card => !card.isDone && (Date.now() <  (card.due ? new Date(card.due) : Date.now())));
                boardsStatistic[board.name].completeAfterDueCards = allCards.filter(card => card.due && card.isDone).filter(card => new Date(card.doneAt) >  new Date(card.due));
                boardsStatistic[board.name].completeBeforeDueCards = allCards.filter(card => card.due && card.isDone).filter(card => new Date(card.doneAt) <  new Date(card.due));
            }
        }
        // Get board member
        boardsStatistic[board.name].members = board.members
	});

    return boardsStatistic;
}