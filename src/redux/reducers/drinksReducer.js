import { RECEIVED_DRINKS } from '../actions/index';

const INITIAL_STATE = { };

export default function drinksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case RECEIVED_DRINKS:
    return { ...state, drinks: payload.drinks };
  default:
    return state;
  }
}
