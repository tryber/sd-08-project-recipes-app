// import { fetchFistMealCats } from '../../services/MealAPI';
import { fetchMealByList } from '../../services/mealsAPIfetch';
import { FETCH_CATEGORIES } from './index';

const fetchMealCatsAction = (categories) => ({
  type: FETCH_CATEGORIES,
  payload: {
    categories,
  },
});

const fetchMealCatsThunk = () => async (dispatch) => {
  const MealCats = await fetchMealByList('c');
  dispatch(fetchMealCatsAction(MealCats));
};

export default fetchMealCatsThunk;
