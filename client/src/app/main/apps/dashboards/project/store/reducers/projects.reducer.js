import * as Actions from '../actions/projects.actions';

const initialState = null;

const projectsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROJECTS:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};

export default projectsReducer;
