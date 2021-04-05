import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import loginReducer from './loginReducer';
import drinkReducer from './drinksReducer';
import mealsCategoriesReducer from './mealsCategoriesReducer';
import drinkCategoriesReducer from './drinkCategoriesReducer';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
  mealsReducer,
  loginReducer,
  drinkReducer,
  mealsCategoriesReducer,
  drinkCategoriesReducer,
  detailsReducer,
});

export default rootReducer;
