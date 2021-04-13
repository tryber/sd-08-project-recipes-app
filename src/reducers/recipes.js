import { ADD_CATEGORIES, ADD_FAVORITE, ADD_FILTER, ADD_RECIPES,
  ADD_RECOMMENDATIONS, END_RECIPE, REQUEST_RECIPES, RM_FAVORITE,
  START_RECIPE, ADD_BYINGREDIENT, ADD_COUNTRIES } from '../actions';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

const INITIAL_STATE = {
  list: [],
  isFetching: true,
  categories: [],
  filter: '',
  recommendations: [],
  start: { comidas: inProgressRecipes.meals || {},
    bebidas: inProgressRecipes.cocktails || {} },
  done: doneRecipes,
  favorite: favoriteRecipes,
  byIngredient: '',
  areas: { meals: [] },
};

const MAX_RECIPES = 12;
const MAX_RECOMMENDATIONS = 6;

const recipes = (state = INITIAL_STATE, action) => {
  const doneDate = new Date();
  switch (action.type) {
  case REQUEST_RECIPES:
    return { ...state, isFetching: true };
  case ADD_RECIPES:
    return { ...state, isFetching: false, list: action.payload.slice(0, MAX_RECIPES) };
  case ADD_CATEGORIES:
    return { ...state, categories: action.payload };
  case ADD_FILTER:
    return { ...state, filter: action.payload };
  case ADD_RECOMMENDATIONS:
    return { ...state, recommendations: action.payload.slice(0, MAX_RECOMMENDATIONS) };
  case START_RECIPE:
    return { ...state,
      start: { ...state.start,
        [action.selectedType]:
          { ...state.start[action.selectedType], ...action.payload } } };
  case END_RECIPE:
    return { ...state,
      done: [...state.done,
        { ...action.payload, doneDate: doneDate.toLocaleDateString('pt-Br') }] };
  case ADD_FAVORITE:
    return { ...state, favorite: [...state.favorite, action.payload] };
  case RM_FAVORITE:
    return { ...state,
      favorite: [...state.favorite
        .filter(({ id, type }) => id !== action.payload.id
          || type !== action.payload.type)] };
  case ADD_BYINGREDIENT:
    return { ...state, byIngredient: action.payload };
  case ADD_COUNTRIES:
    return { ...state, areas: action.payload };
  default:
    return state;
  }
};

export default recipes;
