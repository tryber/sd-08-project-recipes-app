import {
  CATEGORIES_FOODS_FILTER,
  CATEGORIES_DRINKS_FILTER,
  RESET_STATE,
  INGREDIENTS_DRINKS_FILTER,
  INGREDIENTS_FOODS_FILTER,
} from '../actions';

const INITIAL_STATE = {
  foodsFilterCategories: [],
  drinksFilterCategories: [],
  category: '',
};

const FilterByCategory = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CATEGORIES_FOODS_FILTER:
    return {
      ...state,
      foodsFilterCategories: action.payload.foods,
      category: action.payload.category,
    };
  case CATEGORIES_DRINKS_FILTER:
    return {
      ...state,
      drinksFilterCategories: action.payload.drinks,
      category: action.payload.category,
    };
  case RESET_STATE:
    return {
      foodsFilterCategories: [],
      drinksFilterCategories: [],
      category: action.payload.category,
    };
  case INGREDIENTS_DRINKS_FILTER:
    return {
      ...state,
      drinksFilterCategories: action.payload.drinks,
    };
  case INGREDIENTS_FOODS_FILTER:
    return {
      ...state,
      foodsFilterCategories: action.payload.foods,
    };
  default:
    return state;
  }
};

export default FilterByCategory;
