// import { fetchRecipesMealCats } from '../../services/MealAPI';
import { fetchMealByFilters } from '../../services/mealsAPIfetch';
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
  const { meals } = await fetchMealByFilters(filter, 'c');
  const result = meals !== null ? filterToTwelve(meals) : meals;
  dispatch(fetchRecipesMealCatsAction(result));
};

export default fetchRecipesMealCatsThunk;
