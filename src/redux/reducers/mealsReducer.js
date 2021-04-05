import { RECEIVED_MEALS } from '../actions/index';

const INITIAL_STATE = { };

export default function mealsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case RECEIVED_MEALS:
    return { ...state, meals: payload.meals };
  default:
    return state;
  }
}
