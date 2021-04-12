import {
  getMealsByRandom,
  getDrinksByRandom,
  getMealsByRegion,
  getMealsByRegions,
  getDrinksByRegion,
  getMealsDetails,
  getDrinksDetails,
  getMealsIngredients,
  getDrinksIngredients,
  getMealsByName,
  getDrinksByName,
} from '../../services';

import {
  RECIPE_EXPLORE_REGIONS_FETCH,
  RECIPE_EXPLORE_REGIONS_FETCH_SUCCESS,
  RECIPE_EXPLORE_REGIONS_FETCH_ERROR,
  RECIPES_BY_REGIONS_FETCH,
  RECIPES_BY_REGIONS_FETCH_SUCCESS,
  RECIPES_BY_REGIONS_FETCH_ERROR,
  INGREDIENTS_FETCH,
  INGREDIENTS_FETCH_SUCCESS,
  INGREDIENTS_FETCH_ERROR,
} from './constants';

export const INGREDIENTS = 'INGREDIENTS';
export const REGIONS = 'REGIONS';
export const RECIPES_BY_INGREDIENT = 'RECIPES_BY_INGREDIENT';
export const EXPLORE_INGREDIENTS_BY_FOOD = 'comidas';
export const RECIPES_BY_REGION = 'RECIPES_BY_REGION';

export const RANDOM_RECIPE_ERROR = 'RANDOM_RECIPE_ERROR';
export const INGREDIENTS_ERROR = 'INGREDIENT_ERRORS';
export const REGIONS_ERROR = 'REGIONS_RECIPE';
export const RECIPES_BY_INGREDIENT_ERROR = 'RECIPES_BY_INGREDIENT_ERROR';
export const RECIPES_BY_REGION_ERROR = 'RECIPES_BY_REGION_ERROR';

export const RANDOM_RECIPE_FETCHING = 'RANDOM_RECIPE_FETCHING';
export const INGREDIENTS_FETCHING = 'INGREDIENT_FETCHINGS';
export const REGIONS_FETCHING = 'REGIONS_RECIPE';
export const RECIPES_BY_INGREDIENT_FETCHING = 'RECIPES_BY_INGREDIENT_FETCHING';
export const RECIPES_BY_REGION_FETCHING = 'RECIPES_BY_REGION_FETCHING';

const recipeFetch = () => ({
  type: RECIPE_EXPLORE_REGIONS_FETCH,
});

const recipeFetchSuccess = (payload) => ({
  type: '',
  payload,
});

const recipeFetchErrored = (error) => ({
  type: '',
  error,
});

const ingredientsFetch = () => ({
  type: INGREDIENTS_FETCH,
});

const ingredientsFetchSuccess = (payload) => ({
  type: INGREDIENTS_FETCH_SUCCESS,
  payload,
});

const ingredientsFetchErrored = (error) => ({
  type: INGREDIENTS_FETCH_ERROR,
  error,
});

const recipeRegionFetchSuccess = (payload) => ({
  type: RECIPE_EXPLORE_REGIONS_FETCH_SUCCESS,
  payload,
});

const recipeRegionFetchErrored = (error) => ({
  type: RECIPE_EXPLORE_REGIONS_FETCH_ERROR,
  error,
});

const recipeByRegionFetch = () => ({
  type: RECIPES_BY_REGIONS_FETCH,
});

const recipeByRegionFetchSuccess = (payload) => ({
  type: RECIPES_BY_REGIONS_FETCH_SUCCESS,
  payload,
});

const recipeByRegionFetchErrored = (error) => ({
  type: RECIPES_BY_REGIONS_FETCH_ERROR,
  error,
});

export const getRandomRecipe = (type) => (dispatch) => {
  const fetcher = type === 'comidas' ? getMealsByRandom : getDrinksByRandom;
  dispatch(recipeFetch());
  fetcher()
    .then((recipe) => {
      const data = type === 'comidas' ? recipe.meals : recipe.drinks;
      console.log('getIngredients', recipe);
      dispatch(recipeFetchSuccess(data));
    })
    .catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getIngredients = (pathname) => (dispatch) => {
  const type = pathname.split('/')[2];
  const fetcher = type === EXPLORE_INGREDIENTS_BY_FOOD
    ? getMealsIngredients
    : getDrinksIngredients;
  dispatch(ingredientsFetch());
  fetcher('')
    .then((ingre) => {
      const data = type === EXPLORE_INGREDIENTS_BY_FOOD ? ingre.meals : ingre.drinks;
      dispatch(ingredientsFetchSuccess(data));
    })
    .catch((error) => dispatch(ingredientsFetchErrored(error)));
};

export const getRecipesByingredient = (id, type) => (dispatch) => {
  const fetcher = type === EXPLORE_INGREDIENTS_BY_FOOD
    ? getMealsDetails
    : getDrinksDetails;
  dispatch(recipeFetch());
  fetcher(id)
    .then((result) => {
      const data = type === EXPLORE_INGREDIENTS_BY_FOOD ? result.meals : result.drinks;
      console.log('getRecipesByingredient', result);
      dispatch(recipeFetchSuccess(data));
    })
    .catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getRegionRecipe = () => (dispatch) => {
  getMealsByRegions()
    .then((recipe) => {
      dispatch(recipeRegionFetchSuccess(recipe.meals));
    })
    .catch((error) => dispatch(recipeRegionFetchErrored(error)));
};

export const getExploreMealsByRegion = (region) => (dispatch) => {
  const fetcher = region === 'All' ? getMealsByName : getMealsByRegion;
  dispatch(recipeByRegionFetch());
  fetcher(region)
    .then((recipe) => {
      dispatch(recipeByRegionFetchSuccess(recipe.meals));
    })
    .catch((error) => dispatch(recipeByRegionFetchErrored(error)));
};

export const getExploreDrinksByRegion = (region) => (dispatch) => {
  const fetcher = region === 'All' ? getDrinksByName : getDrinksByRegion;
  dispatch(recipeByRegionFetch());
  fetcher(region)
    .then((recipe) => {
      console.log('getExploreDrinksByRegion', recipe);
      dispatch(recipeByRegionFetchSuccess(recipe.drinks));
    })
    .catch((error) => dispatch(recipeByRegionFetchErrored(error)));
};
