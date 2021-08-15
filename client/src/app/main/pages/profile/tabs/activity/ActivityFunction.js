import { deserializeObject } from "app/main/common/CommonFunctions";

export const getUsersActivity = (userId, boardsInfo) => {
    let boardsInfoClone = JSON.parse(JSON.stringify(boardsInfo));
    boardsInfoClone = deserializeObject(boardsInfoClone);
    console.log('boardsInfoClone');
    console.log(boardsInfoClone);
    let activities = [];
    boardsInfoClone.forEach(board =>{
        board.lists.forEach(list=> {
            list.cards.forEach(card => {
                card.activities.forEach(activity =>{
                    activity.boardName = board.name;
                    activity.boardId = board.id;
                    activity.cardId = card.id;
                    activity.card = card;
                })
                activities = [...activities, ...card.activities];
            });
        })
        board.activities.forEach(activity =>{
            activity.boardName = board.name;
            activity.boardId = board.id;
        })
        activities = [...activities, ...board.activities].filter(activity => activity.idMember == userId).sort((a,b) => new Date(b.time) - new Date(a.time));
    })
    return activities;
}























