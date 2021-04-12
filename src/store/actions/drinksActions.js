import {
  getDrinksIngredient,
  getDrinksByName,
  getDrinksByLetter,
  getDrinksByRandom,
  getDrinksByCategories,
  getDrinksByCategory,
} from '../../services';

export const RECIPE_FETCH = 'RECIPE_FETCH';
export const RECIPE_FETCH_SUCCESS_DATA = 'RECIPE_FETCH_SUCCESS_DATA';
export const RECIPE_FETCH_SUCCESS = 'RECIPE_FETCH_SUCCESS';
export const RECIPE_FETCH_ERROR = 'RECIPE_FETCH_ERROR';

const createDrink = (value) => ({
  ingredient: getDrinksIngredient(value),
  name: getDrinksByName(value),
  firstLetter: getDrinksByLetter(value),
});

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

export const getDrinksBySearch = ({ search, searchRadio }) => (dispatch) => {
  const fetch = createDrink(search);
  dispatch(recipeFetch());
  fetch[searchRadio]
    .then((data) => dispatch(recipeFetchSuccess(data.drinks)))
    .catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getDrinksAll = () => (dispatch) => {
  dispatch(recipeFetch());
  Promise.all([getDrinksByRandom(), getDrinksByCategories()])
    .then((data) => {
      const drinksCategories = data[1].drinks;
      const { drinks } = data[0];
      dispatch(recipeFetchSuccessData({ drinks, drinksCategories }));
    })
    .catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getDrinksCategoriesFilter = (category) => (dispatch) => {
  dispatch(recipeFetch());
  getDrinksByCategory(category)
    .then((recipe) => {
      dispatch(recipeFetchSuccess(recipe.drinks));
    })
    .catch((error) => dispatch(recipeFetchErrored(error)));
};

export const getDrinks = () => (dispatch) => {
  dispatch(recipeFetch());
  getDrinksByRandom()
    .then((recipe) => {
      dispatch(recipeFetchSuccess(recipe.drinks));
    })
    .catch((error) => dispatch(recipeFetchErrored(error)));
};
