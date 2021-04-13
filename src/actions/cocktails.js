import {
  getCocktailsByFirstLetter,
  getCocktailsByIngredient,
  getCocktailsByName,
  getRandomCocktails,
  getCocktailsDetailsById,
  getCocktailsByCategory,
  getCocktailsCategories,
  getCocktailsIngredients,
} from '../services/cocktailsAPI';

export const REQUEST_COCKTAILS = 'REQUEST_COCKTAILS';
export const REQUEST_COCKTAILS_SUCCESS = 'REQUEST_COCKTAILS_SUCCESS';
export const REQUEST_COCKTAILS_FAILURE = 'REQUEST_COCKTAILS_FAILURE ';

export const REQUEST_COCKTAILS_CATEGORIES = 'REQUEST_COCKTAILS_CATEGORIES';
export const COCKTAILS_CATEGORIES_SUCCESS = 'COCKTAILS_CATEGORIES_SUCCESS';
export const COCKTAILS_CATEGORIES_FAILURE = 'COCKTAILS_CATEGORIES_FAILURE';

export const REQUEST_COCKTAILS_INGREDIENTS = 'REQUEST_COCKTAILS_INGREDIENTS';
export const COCKTAILS_INGREDIENTS_SUCCESS = 'COCKTAILS_INGREDIENTS_SUCCESS';
export const COCKTAILS_INGREDIENTS_FAILURE = 'COCKTAILS_INGREDIENTS_FAILURE';

export const COCKTAILS_INGREDIENT_CURRENCY = 'COCKTAILS_INGREDIENT_CURRENCY';

const requestCocktails = () => ({ type: REQUEST_COCKTAILS });

const setCocktailsSuccess = (cocktails) => (
  { type: REQUEST_COCKTAILS_SUCCESS, cocktails });

const setCocktailsFailure = (error) => ({ type: REQUEST_COCKTAILS_FAILURE, error });

const requestCocktailsCategories = () => ({ type: REQUEST_COCKTAILS_CATEGORIES });

const setCocktailsCategoriesSuccess = (cocktails) => (
  { type: COCKTAILS_CATEGORIES_SUCCESS, cocktails });

const setCocktailsCategoriesFailure = (error) => (
  { type: COCKTAILS_CATEGORIES_FAILURE, error });

const requestCocktailsIngredients = () => ({ type: REQUEST_COCKTAILS_INGREDIENTS });

const setCocktailsIngredientsSuccess = (ingredients) => (
  { type: COCKTAILS_INGREDIENTS_SUCCESS, ingredients });

const setCocktailsIngredientsFailure = (error) => (
  { type: COCKTAILS_INGREDIENTS_FAILURE, error });

export const setCocktailsIngredientCurrency = (ingredient) => ({
  type: COCKTAILS_INGREDIENT_CURRENCY, ingredient,
});

export const fetchCocktailsByIngredient = (i) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByIngredient(i)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsByName = (name) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByName(name)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsByFirstLetter = (firstLetter) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByFirstLetter(firstLetter)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchRandomCocktails = () => (dispatch) => {
  dispatch(requestCocktails());
  return getRandomCocktails()
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsDetailsById = () => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsDetailsById()
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};
export const fetchCocktailsByCategory = (category) => (dispatch) => {
  dispatch(requestCocktails());
  return getCocktailsByCategory(category)
    .then((response) => dispatch(setCocktailsSuccess(response)))
    .catch((error) => dispatch(setCocktailsFailure(error)));
};

export const fetchCocktailsCategories = () => (dispatch) => {
  dispatch(requestCocktailsCategories());
  return getCocktailsCategories()
    .then((response) => dispatch(setCocktailsCategoriesSuccess(response)))
    .catch((error) => dispatch(setCocktailsCategoriesFailure(error)));
};

export const fetchCocktailsIngredients = () => (dispatch) => {
  dispatch(requestCocktailsIngredients());
  return getCocktailsIngredients()
    .then((response) => dispatch(setCocktailsIngredientsSuccess(response)))
    .catch((error) => dispatch(setCocktailsIngredientsFailure(error)));
};
