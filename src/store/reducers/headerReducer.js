import {
  TOGGLE_BUTTON_SEARCH,
  TOGGLE_HEADER_TITLE,
  SET_FILTERS_FOODS_BUTTONS,
  SET_FILTERS_DRINKS_BUTTONS,
} from '../actions/headerAction';

const INITIAL_STATE_USER = {
  showButtonSearch: false,
  foodsButtonsFilter: [],
  drinksButtonsFilter: [],
};
export default function headerReducer(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case TOGGLE_BUTTON_SEARCH:

    return {
      ...state,
      showButtonSearch: !state.showButtonSearch,
    };
  case TOGGLE_HEADER_TITLE:
    return {
      ...state,
      titleHeader: action.payload.titleHeader,
    };
  case SET_FILTERS_FOODS_BUTTONS:
    return {
      ...state,
      foodsButtonsFilter: [...action.payload.meals],
    };
  case SET_FILTERS_DRINKS_BUTTONS:
    return {
      ...state,
      drinksButtonsFilter: [...action.payload.drinks],
    };
  default:
    return state;
  }
}
