import * as Actions from '../actions';

const initialState = {
    entities         : [],
    selectedContactId: null,
    onlineUser: null,
};

const contactsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CONTACTS:
        {
            return {
                ...state,
                entities: [...action.payload]
            };
        }
        case Actions.SET_SELECTED_CONTACT_ID:
        {
            return {
                ...state,
                selectedContactId: action.payload
            };
        }
        case Actions.REMOVE_SELECTED_CONTACT_ID:
        {
            return {
                ...state,
                selectedContactId: null
            };
        }
        case Actions.GET_ONLINE_USER:
            return {
                ...state,
                onlineUser: action.payload,
            };
        default:
        {
            return state;
        }
    }
};

export default contactsReducer;