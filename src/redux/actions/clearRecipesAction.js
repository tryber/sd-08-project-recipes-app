import { CLEAR_RECIPES, CLEAR_SINGLE_RECIPE } from './index';

export const clearRecipesAction = () => ({
  type: CLEAR_RECIPES,
});

export const clearSingleRecipe = () => ({ type: CLEAR_SINGLE_RECIPE });
