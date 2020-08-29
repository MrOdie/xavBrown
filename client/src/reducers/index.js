import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import story from './story';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  story,
  post
});