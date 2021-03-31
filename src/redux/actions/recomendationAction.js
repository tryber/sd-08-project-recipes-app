// import { fetchMealByName } from '../../services/MealAPI';
import { fetchMealBySearch } from '../../services/mealsAPIfetch';
import { FETCH_RECOMENDATION } from './index';

const recomendationAction = (value) => (
  {
    type: FETCH_RECOMENDATION,
    payload: value,
  }
);

const filterToSix = (list) => {
  const MAX_LENGTH_RECIPES = 6;

  const filteredList = (list.length <= MAX_LENGTH_RECIPES)
    ? list : list.filter((elem, i) => i < MAX_LENGTH_RECIPES && elem);

  return filteredList;
};

const recomendationThunkMeals = () => async (dispatch) => {
  const { meals } = await fetchMealBySearch('', 's');
  const result = filterToSix(meals);
  dispatch(recomendationAction(result));
};

export default recomendationThunkMeals;
