import * as Actions from '../actions/projects.actions';

const initialState = {
    userBoards: null
};

const projectsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DASHBOARD_DATA:
            return {
                ...state,
                userBoards: action.payload
            };
        default:
            return state;
    }
};

export default projectsReducer;
