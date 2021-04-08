import { combineReducers } from 'redux';

import recipes from './mealRecipes';
import ingredients from './mealIngredients';
import categories from './mealCategories';
import areas from './mealAreas';

const meals = combineReducers({
  recipes,
  ingredients,
  categories,
  areas,
});

export default meals;
