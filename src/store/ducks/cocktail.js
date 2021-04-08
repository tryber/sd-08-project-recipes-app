import { combineReducers } from 'redux';

import recipes from './cocktailRecipes';
import ingredients from './cocktailIngredients';
import categories from './cocktailCategories';

const cocktail = combineReducers({
  recipes,
  ingredients,
  categories,
});

export default cocktail;
