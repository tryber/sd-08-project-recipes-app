import {
  FecthDrinks,
  FetchDrinksOnMount,
  fetchDrinksCategories,
  filterDrinksByButton,
  getDrinksByIngredient,
} from '../../services/theCockTailDB';
import {
  FecthMeals,
  FetchFoodsCategories,
  FetchFoodsOnMount,
  filterFoodsByButton,
  getMealsAreas,
  getMealsByArea,
  getMealsByIngredient,
} from '../../services/theMeadlDB';
import {
  GET_API_FOOD,
  FETCH_API_FOODS,
  FETCH_API_CATEGORIES,
  FETCH_API_DRINKS,
  ERROR_REQUEST_API_FOODS,
  GET_API_DRINKS,
  ERROR_REQUEST_API_DRINKS,
  GET_FILTER_BTN_FOOD,
  GET_FILTER_BTN_DRINK,
  GET_MEALS_BY_AREA,
  GET_AREAS,
  FETCH_AREAS,
  GET_DRINKS_BY_INGREDIENT,
  GET_MEALS_BY_INGREDIENT,
  RENDER_DRINKS_BY_INGREDIENT,
  RENDER_MEALS_BY_INGREDIENT,
  RENDER_DRINKS_BY_ORIGIN,
  RENDER_MEALS_BY_ORIGIN,
  GET_DRINKS_BY_SEARCH,
  GET_MEALS_BY_SEARCH,
} from './types';

const setFood = (data) => ({
  type: GET_API_FOOD,
  payload: data,
});

const setDrinks = (data) => ({
  type: GET_API_DRINKS,
  payload: data,
});

const setDrinksBySearch = (data) => ({
  type: GET_DRINKS_BY_SEARCH,
  payload: data,
});

const setMealsBySearch = (data) => ({
  type: GET_MEALS_BY_SEARCH,
  payload: data,
});

const setMealsByIngredient = (data) => ({
  type: GET_MEALS_BY_INGREDIENT,
  payload: data,
});

const setDrinksByIngredient = (data) => ({
  type: GET_DRINKS_BY_INGREDIENT,
  payload: data,
});

const renderByDrinksIngredient = () => ({
  type: RENDER_DRINKS_BY_INGREDIENT,
});

const renderByMealsIngredient = () => ({
  type: RENDER_MEALS_BY_INGREDIENT,
});

export const renderByDrinksOrigin = () => ({
  type: RENDER_DRINKS_BY_ORIGIN,
});

export const renderByMealsOrigin = () => ({
  type: RENDER_MEALS_BY_ORIGIN,
});

const isFetchingFoods = () => ({
  type: FETCH_API_FOODS,
});

export const isFetchingCategories = () => ({
  type: FETCH_API_CATEGORIES,
});

export const isFetchingAreas = () => ({
  type: FETCH_AREAS,
});
const setAreas = (data) => ({
  type: GET_AREAS,
  payload: data,
});

const setMealsByArea = (data) => ({
  type: GET_MEALS_BY_AREA,
  payload: data,
});

const isFetchingDrinks = () => ({
  type: FETCH_API_DRINKS,
});

const errorFetchingFoods = (error) => ({
  type: ERROR_REQUEST_API_FOODS,
  payload: error,
});

const errorFetchingDrinks = (error) => ({
  type: ERROR_REQUEST_API_DRINKS,
  payload: error,
});

const setByButtonFood = (data) => ({
  type: GET_FILTER_BTN_FOOD,
  payload: data,
});

const setByButtonDrink = (data) => ({
  type: GET_FILTER_BTN_DRINK,
  payload: data,
});
export const fetchMealsByFilter = (radio, inputName) => async (dispatch) => {
  dispatch(isFetchingFoods());
  try {
    const apiData = await FecthMeals(radio, inputName);
    const data = { meals: apiData };
    dispatch(setMealsBySearch(data));
  } catch (error) {
    dispatch(errorFetchingFoods(error));
  }
};

export const fetchDrinksByFilter = (radio, inputName) => async (dispatch) => {
  dispatch(isFetchingDrinks());
  try {
    const apiData = await FecthDrinks(radio, inputName);
    const data = { drinks: apiData };
    dispatch(setDrinksBySearch(data));
  } catch (error) {
    dispatch(errorFetchingDrinks(error));
  }
};

export const drinksOnMount = () => async (dispatch) => {
  dispatch(isFetchingDrinks());
  try {
    const apiData = await FetchDrinksOnMount();
    const apiCategories = await fetchDrinksCategories();
    const data = { drinks: apiData, categories: apiCategories };
    dispatch(setDrinks(data));
  } catch (error) {
    dispatch(errorFetchingDrinks(error));
  }
};

export const foodsOnMount = () => async (dispatch) => {
  dispatch(isFetchingFoods());
  try {
    const apiData = await FetchFoodsOnMount();
    const apiCategories = await FetchFoodsCategories();
    const data = { meals: apiData, categories: apiCategories };
    dispatch(setFood(data));
  } catch (error) {
    dispatch(errorFetchingFoods(error));
  }
};

export const filterBtnFood = (category) => async (dispatch) => {
  dispatch(isFetchingFoods());
  try {
    const apiData = await filterFoodsByButton(category);
    dispatch(setByButtonFood(apiData));
  } catch (error) {
    dispatch(errorFetchingFoods(error));
  }
};

export const filterBtnDrink = (category) => async (dispatch) => {
  dispatch(isFetchingDrinks());
  try {
    const apiData = await filterDrinksByButton(category);
    dispatch(setByButtonDrink(apiData));
  } catch (error) {
    dispatch(errorFetchingDrinks(error));
  }
};

export const mealsAreas = () => async (dispatch) => {
  dispatch(isFetchingAreas());
  try {
    const apiData = await getMealsAreas();
    dispatch(setAreas(apiData));
  } catch (error) {
    dispatch(errorFetchingFoods(error));
  }
};

export const filterByArea = (area) => async (dispatch) => {
  dispatch(isFetchingAreas());
  try {
    const apiData = await getMealsByArea(area);
    dispatch(setMealsByArea(apiData));
  } catch (error) {
    dispatch(errorFetchingFoods(error));
  }
};

export const filterMealsByIngrendient = (ingredient) => async (dispatch) => {
  dispatch(isFetchingFoods());
  try {
    dispatch(renderByMealsIngredient());
    const apiData = await getMealsByIngredient(ingredient);
    dispatch(setMealsByIngredient(apiData));
  } catch (error) {
    dispatch(errorFetchingFoods(error));
  }
};

export const filterDrinksByIngrendient = (ingredient) => async (dispatch) => {
  dispatch(isFetchingDrinks());
  try {
    dispatch(renderByDrinksIngredient());
    const apiData = await getDrinksByIngredient(ingredient);
    dispatch(setDrinksByIngredient(apiData));
  } catch (error) {
    dispatch(errorFetchingDrinks(error));
  }
};
