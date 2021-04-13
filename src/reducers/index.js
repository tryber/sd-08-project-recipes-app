import { combineReducers } from 'redux';
import meals from './meals';
import cocktails from './cocktails';
import login from './login';
import searchToggleReducer from './searchToggle';

const rootReducer = combineReducers({
  login, meals, cocktails, searchToggleReducer,
});

export default rootReducer;
