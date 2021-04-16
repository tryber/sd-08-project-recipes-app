import { combineReducers } from 'redux';
import user from './loginReducer';
import search from './searchReducer';
import recipes from './recipesReducer';
import recomendation from './recomendationReducers';

const appReducer = combineReducers({
  user,
  search,
  recipes,
  recomendation,
});

export default appReducer;
