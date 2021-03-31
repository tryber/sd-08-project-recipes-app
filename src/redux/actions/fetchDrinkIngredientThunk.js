// import { fetchIngridients, fetchMealIngridientsFilter } from '../../services/MealAPI';
// import { fetchDrinkIngridients,
//   fetchDrinkIngridientsFilter } from '../../services/CocktailAPI';
import { FETCH_INGREDIENTS } from './index';
// import { fetchMealAction } from './fetchMealAction';
import { fetchDrinkAction } from './fetchDrinkAction';
// import { fetchMealByFilters, fetchMealByList } from '../../services/mealsAPIfetch';
import { fetchDrinkByFilters, fetchDrinkByList } from '../../services/drinkAPIfetch';

export const fetchIngridientsAction = (ingredients) => ({
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

export const fetchDrinkIngredientThunk = (filter) => async (dispatch) => {
  if (filter) {
    const { drinks } = await fetchDrinkByFilters(filter, 'i');
    const result = filterToTwelve(drinks);
    dispatch(fetchDrinkAction(result));
  }
  if (!filter) {
    const { drinks } = await fetchDrinkByList('i');
    const result = filterToTwelve(drinks);
    dispatch(fetchIngridientsAction(result));
  }
};

// export const fetchIngredientThunk = () => async (dispatch) => {
//   const { meals } = await fetchIngridients();
//   const result = filterToTwelve(meals);
//   dispatch(fetchIngridientsAction(result));
// };

// export const fetchDrinkIngredientThunk = () => async (dispatch) => {
//   const { drinks } = await fetchDrinkIngridients();
//   const result = filterToTwelve(drinks);
//   dispatch(fetchIngridientsAction(result));
// };

// export const fetchMealIFilterThunk = (meal) => async (dispatch) => {
//   const { meals } = await fetchMealIngridientsFilter(meal);
//   const result = filterToTwelve(meals);
//   dispatch(fetchMealAction(result));
// };

// export const fetchDrinkIFilterThunk = (drink) => async (dispatch) => {
//   const { drinks } = await fetchDrinkIngridientsFilter(drink);
//   const result = filterToTwelve(drinks);
//   dispatch(fetchDrinkAction(result));
// };
