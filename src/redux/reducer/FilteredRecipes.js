import { FILTERED_FOODS, FILTERED_DRINKS } from '../actions';

const INITIAL_STATE = {
  foods: [],
  drinks: [],
};

const FilteredRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILTERED_FOODS:
    return {
      ...state,
      foods: action.payload.foods,
    };
  case FILTERED_DRINKS:
    return {
      ...state,
      drinks: action.payload.drinks,
    };
  default:
    return state;
  }
};

export default FilteredRecipes;
