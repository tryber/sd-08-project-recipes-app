import {
  RECIPE_FETCH,
  RECIPE_FETCH_SUCCESS_DATA,
  RECIPE_FETCH_SUCCESS,
  RECIPE_FETCH_ERROR,
} from '../actions/foodsActions';
import { alertSearch } from '../../serviceWorker';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  isFetching: false,
  error: '',
};

export default function mealsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECIPE_FETCH:
    return { ...state,
      recipes: [],
      isFetching: true,
    };
  case RECIPE_FETCH_SUCCESS_DATA:
    if (action.meals === null) {
      alertSearch();
      return {
        ...state,
      };
    }
    return { ...state,
      recipes: action.payload.meals,
      categories: action.payload.mealsCategories,
      isFetching: false,
    };
  case RECIPE_FETCH_SUCCESS:
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
