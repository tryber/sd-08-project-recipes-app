const RECIPES_PROGRESS_INITIAL_STATE = {
  recipesProgress: {
    meals: [],
    drinks: [],
  },
};

const RECIPES_DONE_INITIAL_STATE = {
  doneRecipes: {
    meals: [],
    drinks: [],
  },
};

export const recipesInProgress = (state = RECIPES_PROGRESS_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECIPE_IN_PROGRESS_MEALS':
    return { ...state,
      recipesProgress: {
        ...state.recipesProgress,
        meals: [...state.recipesProgress.meals, action.payload.mealInProgress],
      } };
  case 'RECIPE_IN_PROGRESS_DRINKS':
    return { ...state,
      recipesProgress: {
        ...state.recipesProgress,
        drinks: [...state.recipesProgress.drinks, action.payload.drinkInProgress],
      } };
  default:
    return state;
  }
};

export const recipesDone = (state = RECIPES_DONE_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECIPES_DONE_MEALS':
    return { ...state,
      doneRecipes: {
        ...state.doneRecipes,
        meals: action.payload.doneRecipes,
      } };
  case 'RECIPES_DONE_DRINKS':
    return { ...state,
      doneRecipes: {
        ...state.doneRecipes,
        drinks: action.payload.doneRecipes,
      } };
  default:
    return state;
  }
};
