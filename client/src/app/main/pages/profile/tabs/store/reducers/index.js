import { combineReducers } from 'redux';
import about from './about.reducer';

const ProfileReducers = combineReducers({
  about,
});

export default ProfileReducers;