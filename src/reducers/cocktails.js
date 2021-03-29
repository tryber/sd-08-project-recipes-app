import {
  REQUEST_COCKTAILS,
  REQUEST_COCKTAILS_SUCCESS,
  REQUEST_COCKTAILS_FAILURE,
  REQUEST_COCKTAILS_CATEGORIES,
  COCKTAILS_CATEGORIES_SUCCESS,
  COCKTAILS_CATEGORIES_FAILURE,
  REQUEST_COCKTAILS_INGREDIENTS,
  COCKTAILS_INGREDIENTS_SUCCESS,
  COCKTAILS_INGREDIENTS_FAILURE,
  COCKTAILS_INGREDIENT_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  cocktails: [{}, {}],
  cocktailsCategories: [],
  cocktailsIngredients: [],
  ingredientCurrency: '',
  isFetchingCocktails: false,
  isFetchingCategories: false,
  isFetchingIngredients: false,
  error: '',
};

export default function cocktails(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COCKTAILS:
    return { ...state, isFetchingCocktails: true };
  case REQUEST_COCKTAILS_SUCCESS:
    return {
      ...state,
      isFetchingCocktails: false,
      cocktails: action.cocktails.drinks !== null ? [...action.cocktails.drinks] : [],
    };
  case REQUEST_COCKTAILS_FAILURE:
    return { ...state, isFetchingCocktails: false, error: action.error };
  case REQUEST_COCKTAILS_CATEGORIES:
    return { ...state, isFetchingCategories: true };
  case COCKTAILS_CATEGORIES_SUCCESS:
    return {
      ...state,
      isFetchingCategories: false,
      cocktailsCategories: [...action.cocktails.drinks],
    };
  case COCKTAILS_CATEGORIES_FAILURE:
    return { ...state, isFetchingCategories: false, error: action.error };
  case REQUEST_COCKTAILS_INGREDIENTS:
    return { ...state, isFetchingIngredients: true };
  case COCKTAILS_INGREDIENTS_SUCCESS:
    return {
      ...state,
      isFetchingIngredients: false,
      cocktailsIngredients: [...action.ingredients.drinks],
    };
  case COCKTAILS_INGREDIENTS_FAILURE:
    return { ...state, iisFetchingIngredients: false, error: action.error };
  case COCKTAILS_INGREDIENT_CURRENCY:
    return { ...state, ingredientCurrency: action.ingredient };
  default:
    return state;
  }
}
