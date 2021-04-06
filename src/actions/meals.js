import {
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
  getRandomMeals,
  getMealsDetailsById,
  getMealsByCategory,
  getMealsCategories,
  getMealsIngredients,
  getMealsAreas,
  getMealsByArea,
} from '../services/mealsAPI';

export const REQUEST_MEALS = 'REQUEST_MEALS';
export const REQUEST_MEALS_SUCCESS = 'REQUEST_MEALS_SUCCESS';
export const REQUEST_MEALS_FAILURE = 'REQUEST_MEALS_FAILURE ';

export const REQUEST_MEALS_CATEGORIES = 'REQUEST_MEALS_CATEGORIES';
export const REQUEST_MEALS_CATEGORIES_SUCCESS = 'REQUEST_MEALS_CATEGORIES_SUCCESS';
export const REQUEST_MEALS_CATEGORIES_FAILURE = 'REQUEST_MEALS_CATEGORIES_FAILURE ';

export const REQUEST_MEALS_INGREDIENTS = 'REQUEST_MEALS_INGREDIENTS';
export const REQUEST_MEALS_INGREDIENTS_SUCCESS = 'REQUEST_MEALS_INGREDIENTS_SUCCESS';
export const REQUEST_MEALS_INGREDIENTS_FAILURE = 'REQUEST_MEALS_INGREDIENTS_FAILURE ';

export const MEALS_INGREDIENT_CURRENCY = 'MEALS_INGREDIENT_CURRENCY';

export const REQUEST_MEALS_AREAS = 'REQUEST_MEALS_AREAS';
export const REQUEST_MEALS_AREAS_SUCCESS = 'REQUEST_MEALS_AREAS_SUCCESS';
export const REQUEST_MEALS_AREAS_FAILURE = 'REQUEST_MEALS_AREAS_FAILURE ';

const requestMeals = () => ({ type: REQUEST_MEALS });

const setMealsSuccess = (meals) => ({
  type: REQUEST_MEALS_SUCCESS, meals,
});

const setMealsFailure = (error) => ({
  type: REQUEST_MEALS_FAILURE, error,
});

const requestMealsCategories = () => ({
  type: REQUEST_MEALS_CATEGORIES,
});

const setMealsCategoriesSuccess = (categories) => ({
  type: REQUEST_MEALS_CATEGORIES_SUCCESS, categories,
});

const setMealsCategoriesFailure = (error) => ({
  type: REQUEST_MEALS_CATEGORIES_FAILURE, error,
});

const requestMealsIngredients = () => ({ type: REQUEST_MEALS_INGREDIENTS });

const setMealsIngredientsSuccess = (ingredients) => ({
  type: REQUEST_MEALS_INGREDIENTS_SUCCESS, ingredients,
});

const setMealsIngredientsFailure = (error) => ({
  type: REQUEST_MEALS_INGREDIENTS_FAILURE, error,
});

export const setMealsIngredientCurrency = (ingredient) => ({
  type: MEALS_INGREDIENT_CURRENCY, ingredient,
});

const requestMealsAreas = () => ({
  type: REQUEST_MEALS_AREAS,
});

const setMealsAreasSuccess = (areas) => ({
  type: REQUEST_MEALS_AREAS_SUCCESS, areas,
});

const setMealsAreasFailure = (error) => ({
  type: REQUEST_MEALS_AREAS_FAILURE, error,
});

export const fetchMealsByIngredient = (i) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByIngredient(i)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByName = (name) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByName(name)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByFirstLetter = (firstLetter) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByFirstLetter(firstLetter)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchRandomMeals = () => (dispatch) => {
  dispatch(requestMeals());
  return getRandomMeals()
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsDetailsById = () => (dispatch) => {
  dispatch(requestMeals());
  return getMealsDetailsById()
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};
export const fetchMealsByCategory = (category) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByCategory(category)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsCategories = () => (dispatch) => {
  dispatch(requestMealsCategories());
  return getMealsCategories()
    .then((response) => dispatch(setMealsCategoriesSuccess(response)))
    .catch((error) => dispatch(setMealsCategoriesFailure(error)));
};

export const fetchMealsIngredients = () => (dispatch) => {
  dispatch(requestMealsIngredients());
  return getMealsIngredients()
    .then((response) => dispatch(setMealsIngredientsSuccess(response)))
    .catch((error) => dispatch(setMealsIngredientsFailure(error)));
};

export const fetchMealsAreas = () => (dispatch) => {
  dispatch(requestMealsAreas());
  return getMealsAreas()
    .then((response) => dispatch(setMealsAreasSuccess(response)))
    .catch((error) => dispatch(setMealsAreasFailure(error)));
};
export const fetchMealsByAreas = (area) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByArea(area)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};
