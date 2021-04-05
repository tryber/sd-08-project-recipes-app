// import { fetchMeals } from "../../services/fetchAPI";
import { fetchMeal, fetchDrinks, fetchApi } from '../../services/API';

export const REDIRECT_LOGIN = 'REDIRECT_LOGIN';
export const RECEIVED_MEALS = 'RECEIVED_MEALS';
export const RECEIVED_DRINKS = 'RECEIVED_DRINKS';
export const RECEIVED_MEALS_CATEGORIES = 'RECEIVED_MEALS_CATEGORIES';
export const RECEIVED_DRINK_CATEGORIES = 'RECEIVED_DRINK_CATEGORIES';

export const redirectLogin = () => ({ type: REDIRECT_LOGIN });

export const requestMeals = (mealsReceived) => ({
  type: RECEIVED_MEALS,
  payload: { meals: mealsReceived },
});

export const requestMealsCategories = (categoriesReceived) => ({
  type: RECEIVED_MEALS_CATEGORIES,
  payload: { categories: categoriesReceived },
});

export const getMeals = () => async (dispatch) => {
  const mealsReceived = await fetchMeal('', 'name');
  dispatch(
    requestMeals(mealsReceived),
  );
};

export const requestDrinks = (drinksReceived) => ({
  type: RECEIVED_DRINKS,
  payload: { drinks: drinksReceived },
});

export const getBySearch = (value, type, api) => async (dispatch) => {
  if (api === 'meal') {
    console.log(value, type, api);
    const resultsMeals = await fetchApi(value, type, api);
    console.log(resultsMeals);
    dispatch(requestMeals(resultsMeals));
  } else {
    const resultsDrinks = await fetchApi(value, type, api);
    dispatch(requestDrinks(resultsDrinks));
  }
};

export const requestDrinkCategories = (categoriesReceived) => ({
  type: RECEIVED_DRINK_CATEGORIES,
  payload: { categories: categoriesReceived },
});

export const getDrinks = () => async (dispatch) => {
  const drinksReceived = await fetchDrinks('', 'name');
  dispatch(
    requestDrinks(drinksReceived),
  );
};

export const getMealsCategories = () => async (dispatch) => {
  const categoriesReceived = await fetchMeal('list', 'categoriesList');
  dispatch(
    requestMealsCategories(categoriesReceived),
  );
};

export const getDrinkCategories = () => async (dispatch) => {
  const categoriesReceived = await fetchDrinks('list', 'categoriesList');
  dispatch(
    requestDrinkCategories(categoriesReceived),
  );
};
