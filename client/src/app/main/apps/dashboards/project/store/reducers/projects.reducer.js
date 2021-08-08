import * as Actions from '../actions/projects.actions';

const initialState = {
    userBoards: null,
    boardsStatistic: null,
    loading: true,
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
        case Actions.CLEAR_DASHBOARD_DATA:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default projectsReducer;
