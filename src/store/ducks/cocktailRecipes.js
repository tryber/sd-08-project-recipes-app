import * as cocktailApi from '../../services/cocktailApi';

export const Types = {
  FETCH: 'cocktailRecipes/FETCH',
  FETCH_SUCCESS: 'cocktailRecipes/FETCH_SUCCESS',
  FETCH_ERROR: 'cocktailRecipes/FETCH_ERROR',
};

const INITIAL_STATE = {
  isFetching: false,
  notFound: false,
  recipes: [],
  error: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.FETCH:
    return { ...state, isFetching: true, notFound: false };

  case Types.FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      notFound: action.payload.length === 0,
      recipes: action.payload,
      error: '',
    };

  case Types.FETCH_ERROR:
    return {
      ...state,
      isFetching: false,
      notFound: true,
      recipes: [],
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

  fetchRecipes: (searchType = '', searchValue = '') => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      let results = null;
      if (searchType === 'ingredient') {
        results = await cocktailApi.getByIngredient(searchValue);
      } else if (searchType === 'firstLetter') {
        results = await cocktailApi.getByFirstLetter(searchValue);
      } else {
        results = await cocktailApi.getByName(searchValue);
      }
      dispatch(Creators.fetchSuccess(results.drinks || []));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },

  fetchRecipesByCategory: (category = 'All') => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      let results = null;
      if (category === 'All') {
        results = (await cocktailApi.getByName()).drinks || [];
      } else {
        results = (await cocktailApi.getByCategory(category)).drinks || [];
      }
      dispatch(Creators.fetchSuccess(results));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },

  fetchRecipesByIngredient: (ingredient = '') => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const results = (await cocktailApi.getByIngredient(ingredient)).drinks || [];
      dispatch(Creators.fetchSuccess(results));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default recipes;
