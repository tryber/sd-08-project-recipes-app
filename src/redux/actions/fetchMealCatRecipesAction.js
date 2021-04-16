import { fetchMealByFilter } from '../../services/MealAPI';
import { FETCH_CAT_RECIPES } from './index';

const filterToTwelve = (list) => {
  const MAX_LENGTH_RECIPES = 12;

  const filteredList = (list.length <= MAX_LENGTH_RECIPES)
    ? list : list.filter((elem, i) => i < MAX_LENGTH_RECIPES && elem);

  return filteredList;
};

const fetchRecipesMealCatsAction = (filteredRecipes) => ({
  type: FETCH_CAT_RECIPES,
  payload: {
    filteredRecipes,
  },
});

const fetchRecipesMealCatsThunk = (filter) => async (dispatch) => {
  const { meals } = await fetchMealByFilter(filter, 'c');
  const result = filterToTwelve(meals);
  dispatch(fetchRecipesMealCatsAction(result));
};

export default fetchRecipesMealCatsThunk;
