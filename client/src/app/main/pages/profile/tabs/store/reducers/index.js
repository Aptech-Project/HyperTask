import { combineReducers } from 'redux';
import about from './about.reducer';
import contact from './contact.reducer';

const ProfileReducers = combineReducers({
  about,
  contact
});

export default ProfileReducers;