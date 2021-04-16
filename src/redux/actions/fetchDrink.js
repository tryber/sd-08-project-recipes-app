import { fetchDrinkId } from '../../services/CocktailAPI';

import { FETCH_RECIPE_ID } from './index';

const fetchDrinkAction = (recipe) => ({
  type: FETCH_RECIPE_ID,
  payload: {
    recipe,
  },
});

const fetchDrinkActionId = (id) => async (dispatch) => {
  const { drinks } = await fetchDrinkId(id);
  dispatch(fetchDrinkAction(drinks));
};

export default fetchDrinkActionId;
