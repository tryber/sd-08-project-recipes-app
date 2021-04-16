import { fetchDrinkBySearch } from '../../services/CocktailAPI';
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

const recomendationThunkDrinks = () => async (dispatch) => {
  const { drinks } = await fetchDrinkBySearch('', 's');
  const result = filterToSix(drinks);
  dispatch(recomendationAction(result));
};

export default recomendationThunkDrinks;
