import { RECEIVED_DRINK_CATEGORIES } from '../actions/index';

const INITIAL_STATE = { };

export default function drinkCategoriesReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case RECEIVED_DRINK_CATEGORIES:
    return { ...state, categories: payload.categories };
  default:
    return state;
  }
}
