import { AREA_SELECT, CLEAR_SEARCH, FILTER_DRINK_CAT, FETCH_AREA_API,
  SEARCH_INPUT, FILTER_INGREDIENT, FILTER_MEAL_CAT } from '../actions';

const INITIAL_STATE = {
  inputValue: '',
  inputType: '',
  areaChoosen: '',
  drinkFilter: '',
  mealFilter: '',
  ingredientFilter: '',
  areas: [{ strArea: 'All' }],
};

export default function searchBar(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case SEARCH_INPUT:
    return { ...state,
      inputValue: payload.search.inputValue,
      inputType: payload.search.inputType,
      ingredientFilter: '',
      mealFilter: '',
      drinkFilter: '',
    };
  case CLEAR_SEARCH:
    return { ...state,
      inputValue: '',
      inputType: '',
      ingredientFilter: '',
      mealFilter: '',
      drinkFilter: '',
    };
  case FETCH_AREA_API:
    return { ...state, areas: state.areas.concat(payload.area) };
  case AREA_SELECT:
    return { ...state, areaChoosen: payload.area };
  case FILTER_DRINK_CAT:
    return { ...state,
      drinkFilter: payload.drinkFilter,
      inputValue: '',
      inputType: '',
      ingredientFilter: '',
    };
  case FILTER_MEAL_CAT:
    return { ...state,
      mealFilter: payload.mealFilter,
      inputValue: '',
      inputType: '',
      ingredientFilter: '',
    };
  case FILTER_INGREDIENT:
    return { ...state,
      ingredientFilter: payload.ingredient,
      inputValue: '',
      inputType: '',
      mealFilter: '',
      drinkFilter: '',
    };
  default:
    return state;
  }
}
