const initialState = {
  recipesCategories: [],
  drinksCategories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_MEALS_CATEGORIES':
    return {
      ...state,
      recipesCategories: action.payload,
    };
  case 'FETCH_DRINKS_CATEGORIES':
    return {
      ...state,
      drinksCategories: action.payload,
    };
  default:
    return state;
  }
};

export default reducer;
