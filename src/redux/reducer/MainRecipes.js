import { MAIN_DRINKS, MAIN_FOODS } from '../actions';

const INITIAL_STATE = {
  mainFoods: [],
  mainDrinks: [],
};

const FilteredRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MAIN_FOODS:
    return {
      ...state,
      mainFoods: action.payload.foods,
    };
  case MAIN_DRINKS:
    return {
      ...state,
      mainDrinks: action.payload.drinks,
    };
  default:
    return state;
  }
};

export default FilteredRecipes;
