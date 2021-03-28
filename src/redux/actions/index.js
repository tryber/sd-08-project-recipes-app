import {
  // requestDrinkByName,
  // requestDrinkByIngredient,
  // requestDrinkByFirstLetter,
  requestMainDrinks,
  requestCategoriesDrinks,
  requestDrinkByCategory,
} from '../../services/requestDrinksAPI';
import {
  // requestByName,
  // requestByIngredient,
  // requestByFirstLetter,
  requestMainFoods,
  requestCategoriesMeals,
  requestFoodByCategory,
} from '../../services/requestFoodsAPI';

// ACTION DE LOGIN

import {
  IS_LOADING,
  FINISHED_LOADING,
  CATEGORIES_DRINKS_FILTER,
  CATEGORIES_FOODS_FILTER,
  FILTERED_FOODS,
  FILTERED_DRINKS,
  MAIN_FOODS,
  MAIN_DRINKS,
  CATEGORIES_FOODS,
  CATEGORIES_DRINKS,
} from '../../constants/ActionTypes';

export const actionIsLoading = (isLoading) => ({
  type: IS_LOADING,
  payload: {
    isLoading,
  },
});

export const actionFinishedLogin = () => ({
  type: FINISHED_LOADING,
});

export const actionFilteredFoods = (foods) => ({
  type: FILTERED_FOODS,
  payload: {
    foods,
  },
});

export const actionFilteredDrinks = (drinks) => ({
  type: FILTERED_DRINKS,
  payload: {
    drinks,
  },
});

export const actionMainFoods = (foods) => ({
  type: MAIN_FOODS,
  payload: {
    foods,
  },
});

export const actionMainDrinks = (drinks) => ({
  type: MAIN_DRINKS,
  payload: {
    drinks,
  },
});

export const actionCategoriesFoods = (foods) => ({
  type: CATEGORIES_FOODS,
  payload: {
    foods,
  },
});

export const actionCategoriesDrinks = (drinks) => ({
  type: CATEGORIES_DRINKS,
  payload: {
    drinks,
  },
});

export const actionThunkMainFoods = () => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const mainFoods = await requestMainFoods();
  const categoriesFoods = await requestCategoriesMeals();
  dispatch(actionCategoriesFoods(categoriesFoods));
  dispatch(actionMainFoods(mainFoods));
  dispatch(actionIsLoading(false));
};

export const actionThunkMainDrinks = () => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const mainDrinks = await requestMainDrinks();
  const categoriesDrinks = await requestCategoriesDrinks();
  dispatch(actionCategoriesDrinks(categoriesDrinks));
  dispatch(actionMainDrinks(mainDrinks));
  dispatch(actionIsLoading(false));
};

// THUNK ACTIONS FILTER CATEGORIES
export const actionFilterCategoryDrinks = (drinks, category) => ({
  type: CATEGORIES_DRINKS_FILTER,
  payload: {
    drinks,
    category,
  },
});

export const actionThunkCategoryDrinks = (category) => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const drinksByCategory = await requestDrinkByCategory(category);
  dispatch(actionFilterCategoryDrinks(drinksByCategory, category));
  dispatch(actionIsLoading(false));
};

export const actionFilterCategoryFoods = (foods, category) => ({
  type: CATEGORIES_FOODS_FILTER,
  payload: {
    foods,
    category,
  },
});

export const actionThunkCategoryFoods = (category) => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const foodsByCategory = await requestFoodByCategory(category);
  dispatch(actionFilterCategoryFoods(foodsByCategory, category));
  dispatch(actionIsLoading(false));
};

export const RESET_STATE = 'RESET_STATE';

export const actionResetFilteredByCategory = (category) => ({
  type: RESET_STATE,
  payload: {
    category,
  },
});
