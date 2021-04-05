import * as cocktailApi from '../../services/cocktailApi';

export const Types = {
  FETCH: 'cocktailCategories/FETCH',
  FETCH_SUCCESS: 'cocktailCategories/FETCH_SUCCESS',
  FETCH_ERROR: 'cocktailCategories/FETCH_ERROR',
};

const INITIAL_STATE = {
  isFetching: false,
  notFound: false,
  categories: [],
  error: '',
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.FETCH:
    return { ...state, isFetching: true, notFound: false };

  case Types.FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      notFound: action.payload.length === 0,
      categories: action.payload,
      error: '',
    };

  case Types.FETCH_ERROR:
    return {
      ...state,
      isFetching: false,
      notFound: true,
      categories: [],
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

  fetchCategories: () => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const { drinks: results = [] } = await cocktailApi.getCategories();
      dispatch(Creators.fetchSuccess(
        results.map(({ strCategory }) => strCategory),
      ));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default categories;
