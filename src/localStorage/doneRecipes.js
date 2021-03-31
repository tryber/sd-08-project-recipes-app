const KEY_DONE_RECIPES = 'doneRecipes';
const initialState = [];

const objectToBeSavedDoneRecipes = (objRecipe) => ({
  id: objRecipe.idDrink || objRecipe.idMeal,
  type: objRecipe.idDrink ? 'bebida' : 'comida',
  area: objRecipe.strArea || '',
  category: objRecipe.strCategory,
  alcoholicOrNot: objRecipe.strAlcoholic || '',
  name: objRecipe.strMeal || objRecipe.strDrink,
  image: objRecipe.strDrinkThumb || objRecipe.strMealThumb,
  doneDate: new Date(),
  tags: objRecipe.strTags,
});

// const removeRecipeInArray = (local, idRecipe) => {
//   const newArrRecipes = local.filter((el) => el.id !== idRecipe);
//   localStorage.setItem(KEY_DONE_RECIPES, JSON.stringify(newArrRecipes));
// };

const saveDoneRecipes = (recipe, KEY = KEY_DONE_RECIPES) => {
  if (JSON.parse(localStorage.getItem(KEY)) === null) {
    const objRecipe = objectToBeSavedDoneRecipes(recipe);
    const creatArr = initialState.concat(objRecipe);
    localStorage.setItem(KEY, JSON.stringify(creatArr));
  } else {
    const idRecipe = recipe.idDrink || recipe.idMeal;
    const local = JSON.parse(localStorage.getItem(KEY));
    if (local.every((el) => el.id !== idRecipe)) {
      const isSaveRecipe = objectToBeSavedDoneRecipes(recipe);
      const newArrRecipes = local.concat(isSaveRecipe);
      localStorage.setItem(KEY, JSON.stringify(newArrRecipes));
    }
    // else {
    //   removeRecipeInArray(local, idRecipe);
    // }
  }
};

const getLocalStorageDoneRecipe = () => {
  if (JSON.parse(localStorage.getItem(KEY_DONE_RECIPES))) {
    return JSON.parse(localStorage.getItem(KEY_DONE_RECIPES));
  }
  localStorage.setItem(KEY_DONE_RECIPES, JSON.stringify(initialState));
  return initialState;
};

const getLocalStorageDoneRecipeById = (idRecipe) => {
  if (JSON.parse(localStorage.getItem(KEY_DONE_RECIPES))) {
    const local = JSON.parse(localStorage.getItem(KEY_DONE_RECIPES));
    const result = local.find((el) => el.id === idRecipe);
    return result;
  }
  localStorage.setItem(KEY_DONE_RECIPES, JSON.stringify(initialState));
  return initialState;
};

export {
  saveDoneRecipes,
  getLocalStorageDoneRecipe,
  getLocalStorageDoneRecipeById,
};
