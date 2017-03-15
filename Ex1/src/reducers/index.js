import { combineReducers } from 'redux';
import chat from './chat';
import login from './login';
import signup from './signup';
import page from './page';

const rootReducer = combineReducers({
  chat,
  login,
  signup,
  page
});

export default rootReducer
