import { RECEIVED_MEALS_CATEGORIES } from '../actions/index';

const INITIAL_STATE = { };

export default function mealsCategoriesReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case RECEIVED_MEALS_CATEGORIES:
    return { ...state, categories: payload.categories };
  default:
    return state;
  }
}
