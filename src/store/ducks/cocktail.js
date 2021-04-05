import { combineReducers } from 'redux';

import recipes from './cocktailRecipes';
import ingredients from './cocktailIngredients';
import categories from './cocktailCategories';

export default combineReducers({
  recipes,
  ingredients,
  categories,
});
