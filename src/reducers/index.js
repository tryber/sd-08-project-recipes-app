import { combineReducers } from 'redux';
import login from './login';
import recipes from './recipes';

const rootReducer = combineReducers({
  login,
  recipes,
});

export default rootReducer;
