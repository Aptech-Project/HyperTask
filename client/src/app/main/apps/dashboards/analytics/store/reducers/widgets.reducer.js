import * as Actions from '../actions';

const initialState = {
    data: null,
    allUser: null,
};

const widgetsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WIDGETS:
            return {
                ...state,
                data: {...action.payload}
            };
        case Actions.GET_ALL_USERS:
            return {
                ...state,
                allUser: action.payload
            };
        default:
            return state;
    }
};

export default widgetsReducer;