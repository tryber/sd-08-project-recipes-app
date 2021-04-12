import {
  RECIPE_FETCH,
  RECIPE_FETCH_SUCCESS_DATA,
  RECIPE_FETCH_SUCCESS,
  RECIPE_FETCH_ERROR,
} from '../actions/drinksActions';
import { alertSearch } from '../../serviceWorker';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  isFetching: false,
  error: '',
};

export default function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECIPE_FETCH:
    return { ...state,
      recipes: [],
      isFetching: true,
    };
  case RECIPE_FETCH_SUCCESS_DATA:
    return {
      ...state,
      recipes: action.payload.drinks,
      categories: action.payload.drinksCategories,
      isFetching: false,
    };
  case RECIPE_FETCH_SUCCESS:
    if (action.payload === null) {
      alertSearch();
      return {
        ...state,
      };
    }
    return { ...state,
      recipes: [...action.payload],
      isFetching: false,
    };
  case RECIPE_FETCH_ERROR:
    return {
      ...state,
      recipes: [],
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
}
