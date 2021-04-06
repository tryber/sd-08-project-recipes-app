import {
  SEARCH_TOGGLE,
} from '../actions';

const INITIAL_STATE = false;

const searchToggleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_TOGGLE:
    return action.toggle;
  default:
    return state;
  }
};

export default searchToggleReducer;
