export const Types = {
  ADD_MEAL: 'inProgressRecipes/ADD_MEAL',
  REMOVE_MEAL: 'inProgressRecipes/REMOVE_MEAL',
  ADD_COCKTAIL: 'inProgressRecipes/ADD_COCKTAIL',
  REMOVE_COCKTAIL: 'inProgressRecipes/REMOVE_COCKTAIL',
};

const INITIAL_STATE = {
  meals: {},
  cocktails: {},
};

const addMeal = (state, { payload }) => ({
  ...state,
  meals: {
    ...state.meals,
    [payload.idMeal]: payload,
  },
});

const removeMeal = (state, { payload }) => {
  const { [payload.idMeal]: itemToRemove, ...rest } = state.meals;
  return {
    ...state,
    ...rest,
  };
};

const addCocktail = (state, { payload }) => ({
  ...state,
  cocktails: {
    ...state.cocktails,
    [payload.idDrink]: payload,
  },
});

const removeCocktail = (state, { payload }) => {
  const { [payload.idDrink]: itemToRemove, ...rest } = state.cocktails;
  return {
    ...state,
    ...rest,
  };
};

const inProgressRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.ADD_MEAL: return addMeal(state, action);
  case Types.REMOVE_MEAL: return removeMeal(state, action);
  case Types.ADD_COCKTAIL: return addCocktail(state, action);
  case Types.REMOVE_COCKTAIL: return removeCocktail(state, action);
  default: return state;
  }
};

export const Creators = {
  addMeal: (recipe) => ({
    type: Types.ADD_MEAL,
    payload: recipe,
  }),

  removeMeal: (id) => ({
    type: Types.REMOVE_MEAL,
    payload: id,
  }),

  addCocktail: (recipe) => ({
    type: Types.ADD_COCKTAIL,
    payload: recipe,
  }),

  removeCocktail: (id) => ({
    type: Types.REMOVE_COCKTAIL,
    payload: id,
  }),
};

export default inProgressRecipes;
