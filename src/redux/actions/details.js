export const SAVE_ACTUAL_RECIPE = 'SAVE_ACTUAL_RECIPE';
export const SAVE_RECOMMENDATIONS = 'SAVE_RECOMMENDATIONS';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';

export const saveActualRecipe = (actualRecipe) => ({
  type: SAVE_ACTUAL_RECIPE,
  payload: { actualRecipe },
});

export const saveRecommendations = (recommendations) => ({
  type: SAVE_RECOMMENDATIONS,
  payload: { recommendations },
});

export const saveFavorites = (favorites) => ({
  type: SAVE_FAVORITES,
  payload: { favorites },
});
