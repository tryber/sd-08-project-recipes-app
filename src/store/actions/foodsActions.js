import {
  getMealsByLetter,
  getMealsByName,
  getMealsIngredient,
  getMealsByRandom,
  getMealsByCategories,
  getMealsByCategory,
} from '../../services';

export const RECIPE_FETCH = 'RECIPE_FETCH';
export const RECIPE_FETCH_SUCCESS_DATA = 'RECIPE_FETCH_SUCCESS_DATA';
export const RECIPE_FETCH_SUCCESS = 'RECIPE_FETCH_SUCCESS';
export const RECIPE_FETCH_ERROR = 'RECIPE_FETCH_ERROR';

const recipeFetch = () => ({
  type: RECIPE_FETCH,
});

const recipeFetchSuccessData = (payload) => ({
  type: RECIPE_FETCH_SUCCESS_DATA,
  payload,
});
const recipeFetchSuccess = (payload) => ({
  type: RECIPE_FETCH_SUCCESS,
  payload,
});

const recipeFetchErrored = (error) => ({
  type: RECIPE_FETCH_ERROR,
  error,
});

const createFood = (value) => ({
  ingredient: getMealsIngredient(value),
  name: getMealsByName(value),
  firstLetter: getMealsByLetter(value),
});

export const getMealsBySearch = ({ search, searchRadio }) => (dispatch) => {
  dispatch(recipeFetch());
  const fetch = createFood(search);

  fetch[searchRadio]
    .then((data) => dispatch(recipeFetchSuccess(data.meals)))
    .catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getMealsAll = () => (dispatch) => {
  dispatch(recipeFetch());
  Promise.all([getMealsByRandom(), getMealsByCategories()])
    .then((data) => {
      const mealsCategories = data[1].meals;
      const { meals } = data[0];
      dispatch(recipeFetchSuccessData({ meals, mealsCategories }));
    }).catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getMealsCategoriesFilter = (category) => (dispatch) => {
  dispatch(recipeFetch());
  getMealsByCategory(category)
    .then((recipe) => {
      dispatch(recipeFetchSuccess(recipe.meals));
    }).catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getMeals = () => (dispatch) => {
  dispatch(recipeFetch());
  getMealsByRandom()
    .then((recipe) => {
      dispatch(recipeFetchSuccess(recipe.meals));
    }).catch((error) => dispatch(recipeFetchErrored(error)));
};
