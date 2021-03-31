import { FETCH_API, FETCH_CATEGORIES, CLEAR_RECIPES,
  FETCH_CAT_RECIPES, FETCH_INGREDIENTS, FETCH_RECIPE_ID, RANDOM_RECIPE,
  FETCH_RANDOM_RECIPE, CLEAR_RANDOM, CLEAR_SINGLE_RECIPE } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  ingredients: [],
  singleRecipe: [],
  random: false,
};

export default function recipesReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case FETCH_API:
    return {
      ...state, recipes: payload.recipes,
    };
  case CLEAR_RECIPES:
    return {
      ...state, recipes: [],
    };
  case FETCH_CATEGORIES:
    return {
      ...state, categories: payload.categories,
    };
  case FETCH_CAT_RECIPES:
    return {
      ...state, recipes: payload.filteredRecipes,
    };
  case FETCH_INGREDIENTS:
    return {
      ...state, ingredients: payload.ingredients,
    };
  case FETCH_RECIPE_ID:
    return {
      ...state, singleRecipe: payload.recipe,
    };
  case RANDOM_RECIPE:
    return {
      ...state, random: true,
    };
  case FETCH_RANDOM_RECIPE:
    return {
      ...state, singleRecipe: payload.random,
    };
  case CLEAR_RANDOM:
    return {
      ...state, random: false,
    };
  case CLEAR_SINGLE_RECIPE:
    return {
      ...state, singleRecipe: [],
    };
  default:
    return state;
  }
}
