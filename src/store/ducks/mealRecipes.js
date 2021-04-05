import * as mealApi from '../../services/mealApi';

export const Types = {
  FETCH: 'mealRecipes/FETCH',
  FETCH_SUCCESS: 'mealRecipes/FETCH_SUCCESS',
  FETCH_ERROR: 'mealRecipes/FETCH_ERROR',
};

const INITIAL_STATE = {
  isFetching: false,
  notFound: false,
  recipes: [],
  error: '',
};

const fetch = (state) => ({
  ...state, isFetching: true, notFound: false,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  notFound: action.payload.length === 0,
  recipes: action.payload,
  error: '',
});

const fetchError = (state, action) => ({
  ...state,
  error: action.payload,
  recipes: [],
  isFetching: false,
  notFound: true,
});

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.FETCH: return fetch(state);
  case Types.FETCH_SUCCESS: return fetchSuccess(state, action);
  case Types.FETCH_ERROR: return fetchError(state, action);
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
        results = await mealApi.getByIngredient(searchValue);
      } else if (searchType === 'firstLetter') {
        results = await mealApi.getByFirstLetter(searchValue);
      } else {
        results = await mealApi.getByName(searchValue);
      }
      dispatch(Creators.fetchSuccess(results.meals || []));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },

  fetchRecipesByCategory: (category = 'All') => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      let results = null;
      if (category === 'All') {
        results = (await mealApi.getByName()).meals || [];
      } else {
        results = (await mealApi.getByCategory(category)).meals || [];
      }
      dispatch(Creators.fetchSuccess(results));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },

  fetchRecipesByIngredient: (ingredient = '') => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const results = (await mealApi.getByIngredient(ingredient)).meals || [];
      dispatch(Creators.fetchSuccess(results));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },

  fetchRecipesByArea: (area = 'All') => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      let results = null;
      if (area === 'All') {
        results = (await mealApi.getByName()).meals || [];
      } else {
        results = (await mealApi.getByArea(area)).meals || [];
      }
      dispatch(Creators.fetchSuccess(results));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default recipes;
