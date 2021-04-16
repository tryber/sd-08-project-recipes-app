import { CATEGORIES_FOODS, CATEGORIES_DRINKS } from '../actions';

const INITIAL_STATE = {
  foodsCategories: [],
  drinksCategories: [],
};

const CategoriesRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CATEGORIES_FOODS:
    return {
      ...state,
      foodsCategories: action.payload.foods,
    };
  case CATEGORIES_DRINKS:
    return {
      ...state,
      drinksCategories: action.payload.drinks,
    };
  default:
    return state;
  }
};

export default CategoriesRecipes;
