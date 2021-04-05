import * as mealApi from '../../services/mealApi';

export const Types = {
  FETCH: 'mealCategories/FETCH',
  FETCH_SUCCESS: 'mealCategories/FETCH_SUCCESS',
  FETCH_ERROR: 'mealCategories/FETCH_ERROR',
};

const INITIAL_STATE = {
  isFetching: false,
  categories: [],
  error: '',
};

const fetch = (state) => ({
  ...state, isFetching: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  categories: action.payload,
  error: '',
});

const fetchError = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.payload,
  categories: [],
});

const mealCategories = (state = INITIAL_STATE, action) => {
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

  fetchCategories: () => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const { meals: results = [] } = await mealApi.getCategories();
      const categories = results.map(({ strCategory }) => strCategory);
      dispatch(Creators.fetchSuccess(categories));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default mealCategories;
