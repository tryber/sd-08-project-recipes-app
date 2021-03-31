// import { fetchRecipesDrinkCats } from '../../services/CocktailAPI';
import { fetchDrinkByFilters, fetchDrinkBySearch } from '../../services/drinkAPIfetch';
import { FETCH_CAT_RECIPES } from './index';

const filterToTwelve = (list) => {
  const MAX_LENGTH_RECIPES = 12;

  const filteredList = (list.length <= MAX_LENGTH_RECIPES)
    ? list : list.filter((elem, i) => i < MAX_LENGTH_RECIPES && elem);

  return filteredList;
};

const fetchRecipesDrinkCatsAction = (filteredRecipes) => ({
  type: FETCH_CAT_RECIPES,
  payload: {
    filteredRecipes,
  },
});

const fetchRecipesDrinkCatsThunk = (filter) => async (dispatch) => {
  if (!filter) {
    const { drinks } = await fetchDrinkBySearch('', 's');
    const result = filterToTwelve(drinks);
    dispatch(fetchRecipesDrinkCatsAction(result));
  }
  if (filter) {
    const { drinks } = await fetchDrinkByFilters(filter, 'c');
    const result = filterToTwelve(drinks);
    dispatch(fetchRecipesDrinkCatsAction(result));
  }
};

export default fetchRecipesDrinkCatsThunk;
