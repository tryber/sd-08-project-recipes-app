import { fetchMealByFilter, fetchMealByList } from '../../services/MealAPI';
import { fetchDrinkByList, fetchDrinkByFilter } from '../../services/CocktailAPI';
import { FETCH_INGREDIENTS, FILTER_INGREDIENT } from './index';
import { fetchMealAction } from './fetchMealAction';
import { fetchDrinkAction } from './fetchDrinkAction';

const fetchIngridientsAction = (ingredients) => ({
  type: FETCH_INGREDIENTS,
  payload: {
    ingredients,
  },
});

const filterToTwelve = (list) => {
  const MAX_LENGTH_RECIPES = 12;
  const filteredList = (list.length <= MAX_LENGTH_RECIPES)
    ? list : list.filter((elem, i) => i < MAX_LENGTH_RECIPES && elem);
  return filteredList;
};

export const IngridientFilterAction = (ingredient) => ({
  type: FILTER_INGREDIENT,
  payload: {
    ingredient,
  },
});

export const fetchIngredientThunk = () => async (dispatch) => {
  const { meals } = await fetchMealByList('i');
  const result = filterToTwelve(meals);
  dispatch(fetchIngridientsAction(result));
};

export const fetchDrinkIngredientThunk = () => async (dispatch) => {
  const { drinks } = await fetchDrinkByList('i');
  const result = filterToTwelve(drinks);
  dispatch(fetchIngridientsAction(result));
};

export const fetchMealIFilterThunk = (meal) => async (dispatch) => {
  const { meals } = await fetchMealByFilter(meal, 'i');
  const result = filterToTwelve(meals);
  dispatch(fetchMealAction(result));
};

export const fetchDrinkIFilterThunk = (drink) => async (dispatch) => {
  const { drinks } = await fetchDrinkByFilter(drink, 'i');
  const result = filterToTwelve(drinks);
  dispatch(fetchDrinkAction(result));
};
