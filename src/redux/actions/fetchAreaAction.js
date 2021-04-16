import { fetchMealByList } from '../../services/MealAPI';
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
