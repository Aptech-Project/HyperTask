import { combineReducers } from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';

const authReducers = combineReducers({
    user,
    register
});

export default authReducers;