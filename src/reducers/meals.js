import {
  REQUEST_MEALS,
  REQUEST_MEALS_SUCCESS,
  REQUEST_MEALS_FAILURE,
  REQUEST_MEALS_CATEGORIES,
  REQUEST_MEALS_CATEGORIES_SUCCESS,
  REQUEST_MEALS_CATEGORIES_FAILURE,
  REQUEST_MEALS_INGREDIENTS,
  REQUEST_MEALS_INGREDIENTS_SUCCESS,
  REQUEST_MEALS_INGREDIENTS_FAILURE,
  MEALS_INGREDIENT_CURRENCY,
  REQUEST_MEALS_AREAS,
  REQUEST_MEALS_AREAS_SUCCESS,
  REQUEST_MEALS_AREAS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  meals: [{}, {}],
  mealsCategories: [],
  mealsIngredients: [],
  ingredientCurrency: '',
  isFetchingMeals: false,
  isFetchingCategories: false,
  isFetchingIngredients: false,
  mealsAreas: [],
  isFetchingAreas: false,
  error: '',
};

export default function meals(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_MEALS:
    return { ...state, isFetchingMeals: true };
  case REQUEST_MEALS_SUCCESS:
    return {
      ...state,
      isFetchingMeals: false,
      meals: action.meals.meals !== null ? [...action.meals.meals] : [],
    };
  case REQUEST_MEALS_FAILURE:
    return { ...state, isFetchingMeals: false, error: action.error };
  case REQUEST_MEALS_CATEGORIES:
    return { ...state, isFetchingCategories: true };
  case REQUEST_MEALS_CATEGORIES_SUCCESS:
    return {
      ...state,
      isFetchingCategories: false,
      mealsCategories: [...action.categories.meals],
    };
  case REQUEST_MEALS_CATEGORIES_FAILURE:
    return { ...state, isFetchingCategories: false, error: action.error };
  case REQUEST_MEALS_INGREDIENTS:
    return { ...state, isFetchingIngredients: true };
  case REQUEST_MEALS_INGREDIENTS_SUCCESS:
    return {
      ...state,
      isFetchingIngredients: false,
      mealsIngredients: [...action.ingredients.meals],
    };
  case REQUEST_MEALS_INGREDIENTS_FAILURE:
    return { ...state, isFetchingIngredients: false, error: action.error };
  case MEALS_INGREDIENT_CURRENCY:
    return { ...state, ingredientCurrency: action.ingredient };
  case REQUEST_MEALS_AREAS:
    return { ...state, isFetchingAreas: true };
  case REQUEST_MEALS_AREAS_SUCCESS:
    return {
      ...state,
      isFetchingAreas: false,
      mealsAreas: [...action.areas.meals],
    };
  case REQUEST_MEALS_AREAS_FAILURE:
    return { ...state, isFetchingAreas: false, error: action.error };
  default:
    return state;
  }
}
