import * as mealApi from '../../services/mealApi';

export const Types = {
  FETCH: 'mealIngredients/FETCH',
  FETCH_ERROR: 'mealIngredients/FETCH_ERROR',
  FETCH_SUCCESS: 'mealIngredients/FETCH_SUCCESS',
};

const INITIAL_STATE = {
  isFetching: false,
  ingredients: [],
  error: '',
};

const fetch = (state) => ({
  ...state, isFetching: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  ingredients: action.payload,
  error: '',
});

const fetchError = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.payload,
  ingredients: [],
});

const mealIngredients = (state = INITIAL_STATE, action) => {
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

  fetchIngredients: () => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const { meals: ingredients } = await mealApi.getIngredients();
      dispatch(Creators.fetchSuccess(ingredients));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default mealIngredients;
