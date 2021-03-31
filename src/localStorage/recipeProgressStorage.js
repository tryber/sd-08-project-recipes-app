const initialState = {
  cocktails: {},
  meals: {},
};
const KEY = 'inProgressRecipes';

const saveRecipeInProgressStorage = (recipes = initialState) => {
  if (JSON.parse(localStorage.getItem(KEY)) === null) {
    localStorage.setItem(KEY, JSON.stringify(recipes));
  } else {
    localStorage.setItem(KEY, JSON.stringify(recipes));
  }
};

const getLocalStorageRecipesInProgress = () => {
  if (JSON.parse(localStorage.getItem(KEY))) {
    return JSON.parse(localStorage.getItem(KEY));
  }
  localStorage.setItem(KEY, JSON.stringify(initialState));
  return initialState;
};

const getRecipeById = (type, id) => {
  const local = getLocalStorageRecipesInProgress();
  if (local[type][id]) {
    return true;
  }
  return false;
};

export {
  saveRecipeInProgressStorage,
  getLocalStorageRecipesInProgress,
  getRecipeById,
};
