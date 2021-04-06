const initialState = {
  drinks: [],
  ordinaryDrink: [],
  cocktail: [],
  milkFloatShake: [],
  otherUnknown: [],
  cocoa: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_DRINKS':
    return {
      ...state,
      drinks: action.payload,
    };
  case 'FETCH_ORDINARY_DRINKS':
    return {
      ...state,
      ordinaryDrink: action.payload,
    };
  case 'FETCH_COCKTAIL_DRINKS':
    return {
      ...state,
      cocktail: action.payload,
    };
  case 'FETCH_MILK_FLOAT_SHAKE_DRINKS':
    return {
      ...state,
      milkFloatShake: action.payload,
    };
  case 'FETCH_OTHER_UNKNOWN_DRINKS':
    return {
      ...state,
      otherUnknown: action.payload,
    };
  case 'FETCH_COCOA_DRINKS':
    return {
      ...state,
      cocoa: action.payload,
    };
  default:
    return state;
  }
};

export default reducer;
