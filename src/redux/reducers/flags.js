import {
  GET_API_FOOD,
  GET_FILTER_BTN_FOOD,
  RENDER_MEALS_BY_ORIGIN,
  RENDER_DRINKS_BY_ORIGIN,
  RENDER_DRINKS_BY_INGREDIENT,
  RENDER_MEALS_BY_INGREDIENT,
} from '../actions/types';

const INITIALSTATE = {
  onClickFilter: false,
  onClickByRecipe: false,
  onClickByDrink: false,
};

const flags = (state = INITIALSTATE, action) => {
  switch (action.type) {
  case RENDER_MEALS_BY_ORIGIN:
    return { ...state, onClickByRecipe: false };
  case RENDER_DRINKS_BY_ORIGIN:
    return { ...state, onClickByDrink: false };
  case RENDER_DRINKS_BY_INGREDIENT:
    return { ...state, onClickByDrink: true };
  case RENDER_MEALS_BY_INGREDIENT:
    return { ...state, onClickByRecipe: true };
  case GET_FILTER_BTN_FOOD:
    return { ...state, onClickFilter: true };
  case GET_API_FOOD:
    return { ...state, onClickFilter: false };
  default:
    return state;
  }
};

export default flags;
