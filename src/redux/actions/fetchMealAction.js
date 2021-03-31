// import { fetchAreaMeal, fetchMealByFirstLetter,
//   fetchMealByIngredients, fetchMealByName } from '../../services/MealAPI';
import { FETCH_API } from './index';
import { fetchMealBySearch, fetchMealByFilters } from '../../services/mealsAPIfetch';

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
    const { meals } = await fetchMealByFilters(input, 'i');
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
    const { meals } = await fetchMealByFilters(input, 'a');
    const verifiedMeal = alertIfNull(meals);
    const result = filterToTwelve(verifiedMeal);
    dispatch(fetchMealAction(result));
  }
};

export default fetchMealThunk;

// const fetchMealThunk = (input, type) => async (dispatch) => {
//   if (!type && !input) {
//     const { meals } = await fetchMealByName(input);
//     const result = filterToTwelve(meals);
//     dispatch(fetchMealAction(result));
//   }
//   if (type === 'name') {
//     const { meals } = await fetchMealByName(input);
//     const verifiedMeal = alertIfNull(meals);
//     const result = filterToTwelve(verifiedMeal);
//     dispatch(fetchMealAction(result));
//   }
//   if (type === 'ingredient') {
//     const { meals } = await fetchMealByIngredients(input);
//     const verifiedMeal = alertIfNull(meals);
//     const result = filterToTwelve(verifiedMeal);
//     dispatch(fetchMealAction(result));
//   }
//   if (type === 'first-letter') {
//     const { meals } = await fetchMealByFirstLetter(input);
//     const verifiedMeal = alertIfNull(meals);
//     const result = filterToTwelve(verifiedMeal);
//     dispatch(fetchMealAction(result));
//   }
//   if (type === 'area') {
//     const { meals } = await fetchAreaMeal(input);
//     const verifiedMeal = alertIfNull(meals);
//     const result = filterToTwelve(verifiedMeal);
//     dispatch(fetchMealAction(result));
//   }
// };
