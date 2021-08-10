import * as Actions from '../actions/projects.actions';

const initialState = {
    userBoards: null,
    boardsStatistic: null,
    loading: true,
    allUsers: null,
};

const projectsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DASHBOARD_DATA:
            return {
                ...state,
                userBoards: action.allBoards,
                boardsStatistic: action.boardsStatistic,
                loading: false,
            };
        case Actions.GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.allUsers
            };
        case Actions.CLEAR_DASHBOARD_DATA:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default projectsReducer;
