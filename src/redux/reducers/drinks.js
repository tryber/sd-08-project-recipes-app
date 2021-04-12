import
{
  GET_API_DRINKS,
  FETCH_API_DRINKS,
  GET_FILTER_BTN_DRINK,
  ERROR_REQUEST_API_DRINKS,
  GET_DRINKS_BY_INGREDIENT,
  GET_DRINKS_BY_SEARCH,
} from '../actions/types';

const INITIALSTATE = {
  drinks: [],
  categories: [],
  isFetching: false,
};
// setDrinks
const drinks = (state = INITIALSTATE, action) => {
  switch (action.type) {
  case FETCH_API_DRINKS:
    return { ...state, isFetching: true };
  case GET_API_DRINKS:
    return { ...state,
      drinks: action.payload.drinks,
      categories: action.payload.categories,
      isFetching: false,
    };
  case GET_FILTER_BTN_DRINK:
    return { ...state,
      drinks: action.payload,
      isFetching: false,
      onClickFilter: true,
    };
  case GET_DRINKS_BY_SEARCH:
    return {
      ...state,
      drinks: action.payload.drinks,
      isFetching: false,
    };
  case GET_DRINKS_BY_INGREDIENT:
    return { ...state,
      isFetching: false,
      drinks: action.payload,
    };
  case ERROR_REQUEST_API_DRINKS:
    return { ...state,
      drinks: false,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default drinks;
