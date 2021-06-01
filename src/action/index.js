export const SEARCH_BY_INGREDIENT = 'SEARCH_BY_INGREDIENT';

export const ingredientResult = (ingredient, filterButton) => ({
  type: SEARCH_BY_INGREDIENT,
  payload: {
    ingredient,
    filterButton,
  },
});

export const isLoading = () => ({
  type: 'IS_FETCHING',
});

export function fetchIngredient(url, filterButton = false) {
  return async (dispatch) => {
    dispatch(isLoading());
    try {
      const req = await fetch(url);
      const result = await req.json();
      if (result.meals === null || result.drinks === null) {
        dispatch(isLoading());
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      dispatch(ingredientResult(result, filterButton));
      dispatch(isLoading());
    } catch (e) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };
}

export const mealInProgress = (meal) => ({
  type: 'RECIPE_IN_PROGRESS_MEALS',
  payload: {
    mealInProgress: meal,
  },
});

export const drinkInProgress = (drink) => ({
  type: 'RECIPE_IN_PROGRESS_DRINKS',
  payload: {
    drinkInProgress: drink,
  },
});
