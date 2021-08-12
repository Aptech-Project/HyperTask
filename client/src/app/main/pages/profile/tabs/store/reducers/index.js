import { combineReducers } from 'redux';
import about from './about.reducer';
import card from './card.reducer';

const ProfileReducers = combineReducers({
  about,
  card,
});

export default ProfileReducers;