import { FAVORITE_RECIPE } from '../actions';

const INITIAL_STATE = {
  favoriteRecipes: [],
};

export default function favoritesReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case FAVORITE_RECIPE:
    return {
      ...state,
      favoriteRecipes: payload,
    };
  default:
    return state;
  }
}
