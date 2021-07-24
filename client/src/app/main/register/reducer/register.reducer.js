import { ACTION_TYPES } from "../action/register.action";
const initialState = {
    list: []
}


export const Register = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        default:
            return state
    }
}