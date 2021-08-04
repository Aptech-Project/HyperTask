const board = {"id":"1","name":"Bảng 1","members":[{"userId":"1","role":"admin","avatar":""}],"lists":[{"id":"1","name":"List 1","cards":[{"id":"1","name":"Update generators","content":"Current generator doesn't support Node.js 6 and above.","members":["1"],"labels":["1"],"checklist":[{"id":"1","name":"Checklist","checkItems":[{"id":1,"name":"Implement a calendar library","checked":false},{"id":2,"name":"Replace event colors with Material Design colors","checked":true}]}],"dueDate":"2017-08-29T10:16:34.000Z","comment":[{"userId":"1","content":"Done rồi nha","date":"2017-08-29T10:16:34.000Z"}],"info":{"backgroundImage":"","author":"1","files":[{"name":"","url":""}]},"attachments":[{"id":"1","name":"mail.jpg","src":"assets/images/scrumboard/mail.jpg","time":"Added Nov 3 at 15:22AM","type":"image"},{"id":"2","name":"calendar.jpg","src":"assets/images/scrumboard/calendar.jpg","time":"Added Nov 1 at 12:34PM","type":"image"}]}]}],"info":{"backgroundImage":"","author":"1","type":"personalBoard"},"activities":[{"id":"1","userId":"1","type":"comment","message":"We should be able to add moment.js without any problems","cardId":"2837273da9b93dd84243s0f9","listId":"56027cf5a2ca3839a5d36103","createdAt":"now"},{"id":"2","userId":"1","type":"attachment","message":"attached a link","cardId":"2837273da9b93dd84243s0f9","listId":"56027cf5a2ca3839a5d36103","createdAt":"45 mins. ago"}],"labels":[{"id":"1","name":"High Priority","class":"bg-red text-white"}]};

// use this function before send board data to backend
const convertBoardProperty = (board) => {
    Object.keys(board).forEach(key => {
        if (typeof board[key] !== 'string') {
            board[key] = JSON.stringify(board[key])
        }
    })
    return board;
}

const boardConverted = convertBoardProperty(board);
console.log(JSON.stringify(boardConverted))

const uniqueId = new Date().valueOf();