import { fetchRandomDrinks } from '../../services/CocktailAPI';
import { fetchRandomMeal } from '../../services/MealAPI';

import { CLEAR_RANDOM, FETCH_RANDOM_RECIPE, RANDOM_RECIPE } from './index';

export const randomRecipeAction = () => ({ type: RANDOM_RECIPE });

const fetchRandomRecipe = (random) => ({
  type: FETCH_RANDOM_RECIPE,
  payload: {
    random,
  },
});

export const fetchRandomMealAction = () => async (dispatch) => {
  const { meals } = await fetchRandomMeal();
  dispatch(fetchRandomRecipe(meals));
};

export const fetchRandomDrinkAction = () => async (dispatch) => {
  const { drinks } = await fetchRandomDrinks();
  dispatch(fetchRandomRecipe(drinks));
};

export const clearRandom = () => ({ type: CLEAR_RANDOM });
