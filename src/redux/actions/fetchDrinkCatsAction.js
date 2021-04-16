import { fetchDrinkByList } from '../../services/CocktailAPI';
import { FETCH_CATEGORIES } from './index';

const fetchDrinkCatsAction = (categories) => ({
  type: FETCH_CATEGORIES,
  payload: {
    categories,
  },
});

const fetchDrinkCatsThunk = () => async (dispatch) => {
  const drinkCats = await fetchDrinkByList('c');
  dispatch(fetchDrinkCatsAction(drinkCats));
};

export default fetchDrinkCatsThunk;
