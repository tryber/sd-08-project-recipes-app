import {
  RECIPE_DETAILS_FETCH,
  RECIPE_DETAILS_FETCH_ERROR,
  RECIPE_DETAILS_FETCH_SUCCESS_DATA,
} from '../actions/constants';

const recipeInitialState = {
  isFetching: false,
  recipe: {
    idDrink: '',
    ingredients: [],
    measures: [],
    strArea: '',
    strCategory: '',
    strInstructions: '',
    strDrink: '',
    strDrinkThumb: '',
    strTags: '',
    strYoutube: '',
  },
  hasErrored: false,
  recommendations: {
    recipe: [],
    hasErrored: false,
  },
};

export default (state = recipeInitialState, action) => {
  switch (action.type) {
  case RECIPE_DETAILS_FETCH:
    return {
      ...state,
      isFetching: !state.isFetching,
      hasErrored: false,
    };

  case RECIPE_DETAILS_FETCH_SUCCESS_DATA:
    return {
      ...state,
      recipe: action.payload.recipe,
      recommendations: {
        ...state.recommendations,
        recipe: action.payload.recommendations,
      },
    };
  case RECIPE_DETAILS_FETCH_ERROR:
    return {
      ...state,
      recipe: [],
      hasErrored: true,
      isFetching: !state.isFetching,
    };

  default:
    return state;
  }
};
