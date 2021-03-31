import { combineReducers } from 'redux';
import user from './loginReducer';
import search from './searchReducer';
import recipes from './recipesReducer';
import recomendation from './recomendationReducers';
import favoritesReducer from './favoritesReducer';

const appReducer = combineReducers({
  user,
  search,
  recipes,
  recomendation,
  favoritesReducer,
});

export default appReducer;
