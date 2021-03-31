// import { fetchAreaOptions } from '../../services/MealAPI';
import { fetchMealByList } from '../../services/mealsAPIfetch';
import { FETCH_AREA_API } from './index';

const fetchAreaAction = (area) => ({
  type: FETCH_AREA_API,
  payload: {
    area,
  },
});

const fetchAreaThunk = () => async (dispatch) => {
  const { meals } = await fetchMealByList('a');
  dispatch(fetchAreaAction(meals));
};

export default fetchAreaThunk;
