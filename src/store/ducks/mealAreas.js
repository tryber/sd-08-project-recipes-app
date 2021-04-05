import * as mealApi from '../../services/mealApi';

export const Types = {
  FETCH: 'mealAreas/FETCH',
  FETCH_ERROR: 'mealAreas/FETCH_ERROR',
  FETCH_SUCCESS: 'mealAreas/FETCH_SUCCESS',
};

const INITIAL_STATE = {
  isFetching: false,
  areas: [],
  error: '',
};

const fetch = (state) => ({
  ...state, isFetching: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  areas: action.payload,
  error: '',
});

const fetchError = (state, action) => ({
  ...state,
  isFetching: false,
  areas: [],
  error: action.payload,
});

const mealAreas = (state = INITIAL_STATE, action) => {
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

  fetchAreas: () => async (dispatch) => {
    dispatch(Creators.fetch());
    try {
      const { meals: results = [] } = await mealApi.getAreas();
      dispatch(Creators.fetchSuccess(results.map(({ strArea }) => strArea)));
    } catch (error) {
      dispatch(Creators.fetchError(error.message));
    }
  },
};

export default mealAreas;
