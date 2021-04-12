import {
  RECIPE_FETCH,
  RECIPE_FETCH_SUCCESS,
  RECIPE_FETCH_ERROR,
  RECIPE_EXPLORE_REGIONS_FETCH,
  RECIPE_EXPLORE_REGIONS_FETCH_SUCCESS,
  RECIPE_EXPLORE_REGIONS_FETCH_ERROR,
  RECIPES_BY_REGIONS_FETCH,
  RECIPES_BY_REGIONS_FETCH_SUCCESS,
  RECIPES_BY_REGIONS_FETCH_ERROR,
  INGREDIENTS_FETCH,
  INGREDIENTS_FETCH_SUCCESS,
  INGREDIENTS_FETCH_ERROR,
} from '../actions/constants';

const randomInitialState = {
  isFetching: false,
  recipe: [],
  error: {
    status: false,
    msg: '',
  },
};

const byRegionInitialState = {
  isFetching: false,
  regions: [],
  recipes: [],
  error: {
    status: false,
    msg: '',
  },
};

const ingredientsInitialState = {
  isFetching: false,
  ingredients: [],
  recipes: [],
  error: {
    status: false,
    msg: '',
  },
};

export function randomRecipeReducer(state = randomInitialState, action) {
  switch (action.type) {
  case RECIPE_FETCH:
    return {
      ...state,
      error: {
        status: false,
        msg: '',
      },
      isFetching: true,
    };
  case RECIPE_FETCH_SUCCESS:
    return {
      ...state,
      recipe: [...action.payload],
      isFetching: false,
    };
  case RECIPE_FETCH_ERROR:
    return {
      ...state,
      error: {
        ...state.error,
        status: true,
        msg: action.error,
      },
      isFetching: false,
    };
  default:
    return state;
  }
}

export function exploreIngredientsReducer(
  state = ingredientsInitialState,
  action,
) {
  switch (action.type) {
  case INGREDIENTS_FETCH:
    return {
      ...state,
      error: {
        status: false,
        msg: '',
      },
      isFetching: true,
    };
  case INGREDIENTS_FETCH_SUCCESS:
    return {
      ...state,
      ingredients: [...action.payload],
      isFetching: false,
    };
  case INGREDIENTS_FETCH_ERROR:
    return {
      ...state,
      ingredients: [],
      error: {
        ...state.error,
        status: true,
        msg: action.error,
      },
      isFetching: false,
    };

  default:
    return state;
  }
}

export function exploreRecipesByRegion(state = byRegionInitialState, action) {
  switch (action.type) {
  case RECIPE_EXPLORE_REGIONS_FETCH:
    return {
      ...state,
      error: {
        status: false,
        msg: '',
      },
    };

  case RECIPE_EXPLORE_REGIONS_FETCH_SUCCESS:
    return {
      ...state,
      regions: action.payload,
    };

  case RECIPE_EXPLORE_REGIONS_FETCH_ERROR:
    return {
      ...state,
      regions: [],
      error: {
        ...state.error,
        status: true,
        msg: action.error,
      },
    };
  case RECIPES_BY_REGIONS_FETCH:
    return {
      ...state,
      isFetching: !state.isFetching,
    };
  case RECIPES_BY_REGIONS_FETCH_SUCCESS:
    return {
      ...state,
      recipes: action.payload,
      isFetching: !state.isFetching,
    };
  case RECIPES_BY_REGIONS_FETCH_ERROR:
    return {
      ...state,
      error: { ...state.error, status: true, msg: action.error },
      isFetching: !state.isFetching,
    };
  default:
    return state;
  }
}
