import { FETCH_RECOMENDATION } from '../actions';

const INITIAL_STATE = {
  recomendation: [],
};

const recomendationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_RECOMENDATION:

    return { ...state, recomendation: action.payload };

  default:
    return state;
  }
};

export default recomendationReducer;
