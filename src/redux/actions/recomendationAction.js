import { fetchMealBySearch } from '../../services/MealAPI';
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

const recomendationThunk = () => async (dispatch) => {
  const { meals } = await fetchMealBySearch('', 's');
  const result = filterToSix(meals);
  dispatch(recomendationAction(result));
};

export default recomendationThunk;
