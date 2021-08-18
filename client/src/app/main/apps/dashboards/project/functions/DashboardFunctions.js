export const getBoardsStatistic = (allBoards) => {
    const boardsStatistic = {};
    const allBoardsClone = [...allBoards];
	// List of project
	allBoardsClone.forEach(board => {
		boardsStatistic[board.name] = {};
        // Get board cards
		if (board.lists) {
            let allCards = [];
            board.lists.forEach(list => {
                list.cards.forEach(card => {card.boardId = board.id});
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
            // Activity
            boardsStatistic[board.name].cardsActivities = {Day: [], Week: [], Month: []};
            // Task by labels
            boardsStatistic[board.name].tasksByLabels = {};
            const boardLabels = board.labels.map(item => ({id: item.id, name: item.name}));
            // boardLabels.forEach(label => {
            //     boardsStatistic[board.name].tasksByLabels[label.name] = [];
            // })
            if (allCards.length) {
                boardsStatistic[board.name].overdueCards = allCards.filter(card => !card.isDone && (Date.now() >  (card.due ? new Date(card.due) : Date.now())));
                boardsStatistic[board.name].doingCards = allCards.filter(card => !card.isDone && (Date.now() <  (card.due ? new Date(card.due) : Date.now())));
                boardsStatistic[board.name].completeAfterDueCards = allCards.filter(card => card.due && card.isDone).filter(card => new Date(card.doneAt) >  new Date(card.due));
                boardsStatistic[board.name].completeBeforeDueCards = allCards.filter(card => card.due && card.isDone).filter(card => new Date(card.doneAt) <  new Date(card.due));
                
                // Activity
                allCards.forEach(card => {
                    // Process for board activities
                    card.activities.forEach(activity => {
                        let date = new Date(activity.time);
                        const boardsActivities = boardsStatistic[board.name].cardsActivities;
                        Object.keys(boardsActivities).forEach(key => {
                            if (key === 'Day') {
                                const dateClone = date.toISOString().split('T')[0];
                                if (!boardsActivities[key][dateClone]) boardsStatistic[board.name].cardsActivities[key][dateClone] = [];
                                boardsStatistic[board.name].cardsActivities[key][dateClone] = [...boardsStatistic[board.name].cardsActivities[key][dateClone], activity]
                            } else if (key === 'Week') {
                                const weekYear = getWeekNumber(date);
                                if (!boardsActivities[key][weekYear]) boardsStatistic[board.name].cardsActivities[key][weekYear] = [];
                                boardsStatistic[board.name].cardsActivities[key][weekYear] = [...boardsStatistic[board.name].cardsActivities[key][weekYear], activity];
                            } else {
                                const monthYear = getMonthYear(date);
                                if (!boardsActivities[key][monthYear]) boardsStatistic[board.name].cardsActivities[key][monthYear] = [];
                                boardsStatistic[board.name].cardsActivities[key][monthYear] = [...boardsStatistic[board.name].cardsActivities[key][monthYear], activity];
                            }
                        })
                    })
                    // Process for board task with labels
                    card.labels.forEach((labelId) => {
                        const labelName = boardLabels.find(item => item.id === labelId).name;
                        if (!boardsStatistic[board.name].tasksByLabels[labelName]) boardsStatistic[board.name].tasksByLabels[labelName] = [];
                        boardsStatistic[board.name].tasksByLabels[labelName] = [...boardsStatistic[board.name].tasksByLabels[labelName], card];
                    })
                })
            }
        }
        // Get board member
        boardsStatistic[board.name].members = board.members
	});

    return boardsStatistic;
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
	return `${weekNo}-${d.getUTCFullYear()}`;
}

function getMonthYear(d) {
    let dateObj = new Date(d);
    let month = dateObj.getUTCMonth() + 1;
    let year = dateObj.getUTCFullYear();
    return `${month}-${year}`
}