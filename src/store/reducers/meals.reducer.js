const initialState = {
  meals: [],
  Beef: [],
  Breakfast: [],
  Chicken: [],
  Dessert: [],
  Goat: [],
  drinks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_MEALS':
    return {
      ...state,
      meals: action.payload,
    };
  case 'FETCH_BEEF_MEALS':
    return {
      ...state,
      Beef: action.payload,
    };
  case 'FETCH_BREAKFAST_MEALS':
    return {
      ...state,
      Breakfast: action.payload,
    };
  case 'FETCH_CHICKEN_MEALS':
    return {
      ...state,
      Chicken: action.payload,
    };
  case 'FETCH_DESSERT_MEALS':
    return {
      ...state,
      Dessert: action.payload,
    };
  case 'FETCH_GOAT_MEALS':
    return {
      ...state,
      Goat: action.payload,
    };
  case 'FETCH_DRINKS':
    return {
      ...state,
      drinks: action.payload,
    };
  default:
    return state;
  }
};

export default reducer;
