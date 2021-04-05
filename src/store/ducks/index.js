import { combineReducers } from 'redux';

import user from './user';
import meals from './meals';
import cocktails from './cocktail';
import doneRecipes from './doneRecipes';
import favoriteRecipes from './favoriteRecipes';
import inProgressRecipes from './inProgressRecipes';

export default combineReducers({
  user,
  meals,
  cocktails,
  doneRecipes,
  favoriteRecipes,
  inProgressRecipes,
});
