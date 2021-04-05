import * as cocktailApi from '../../services/cocktailApi';

export const Types = {
  FETCH: 'cocktailIngredients/FETCH',
  FETCH_SUCCESS: 'cocktailIngredients/FETCH_SUCCESS',
  FETCH_ERROR: 'cocktailIngredients/FETCH_ERROR',
};

const INITIAL_STATE = {
  isFetching: false,
  notFound: false,
  ingredients: [],
  error: '',
};

const ingredients = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.FETCH:
    return { ...state, isFetching: true, notFound: false };

  case Types.FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      notFound: action.payload.length === 0,
      ingredients: action.payload,
      error: '',
    };

  case Types.FETCH_ERROR:
    return {
      ...state,
      isFetching: false,
      notFound: true,
      ingredients: [],
      error: action.payload,
    };

  default: return state;
  }
};

export const Creators = {
  fetch: () => ({
    type: Types.FETCH,
  }),

  fetchSuccess: (results) => ({
    type: Types.FETCH_SUCCESS,
    payload: results,
  }),

  fetchError: (error) => ({
    type: Types.FETCH_ERROR,
    payload: error,
  }),

  fetchIngredients: () => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const { drinks: results } = await cocktailApi.getIngredients();
      dispatch(Creators.fetchSuccess(results));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default ingredients;
