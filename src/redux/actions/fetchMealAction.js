import { fetchMealByFilter, fetchMealBySearch } from '../../services/MealAPI';
import { FETCH_API } from './index';

export const fetchMealAction = (recipes) => ({
  type: FETCH_API,
  payload: {
    recipes,
  },
});

const filterToTwelve = (list) => {
  const MAX_LENGTH_RECIPES = 12;

  const filteredList = (list.length <= MAX_LENGTH_RECIPES)
    ? list : list.filter((elem, i) => i < MAX_LENGTH_RECIPES && elem);

  return filteredList;
};

const alertIfNull = (list) => {
  let verify;
  if (!list) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    verify = [];
  } else { verify = list; }
  return verify;
};

const fetchMealThunk = (input, type) => async (dispatch) => {
  if (!type && !input) {
    const { meals } = await fetchMealBySearch(input, 's');
    const result = filterToTwelve(meals);
    dispatch(fetchMealAction(result));
  }
  if (type === 'name') {
    const { meals } = await fetchMealBySearch(input, 's');
    const verifiedMeal = alertIfNull(meals);
    const result = filterToTwelve(verifiedMeal);
    dispatch(fetchMealAction(result));
  }
  if (type === 'ingredient') {
    const { meals } = await fetchMealByFilter(input, 'i');
    const verifiedMeal = alertIfNull(meals);
    const result = filterToTwelve(verifiedMeal);
    dispatch(fetchMealAction(result));
  }
  if (type === 'first-letter') {
    const { meals } = await fetchMealBySearch(input, 'f');
    const verifiedMeal = alertIfNull(meals);
    const result = filterToTwelve(verifiedMeal);
    dispatch(fetchMealAction(result));
  }
  if (type === 'area') {
    const { meals } = await fetchMealByFilter(input, 'a');
    const verifiedMeal = alertIfNull(meals);
    const result = filterToTwelve(verifiedMeal);
    dispatch(fetchMealAction(result));
  }
};

export default fetchMealThunk;
