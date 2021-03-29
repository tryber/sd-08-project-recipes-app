const initialState = [];
const KEY = 'favoriteRecipes';

const objectToBeSaved = (objRecipe) => ({
  id: objRecipe.idDrink || objRecipe.idMeal,
  type: objRecipe.idDrink ? 'bebida' : 'comida',
  area: objRecipe.strArea || '',
  category: objRecipe.strCategory,
  alcoholicOrNot: objRecipe.strAlcoholic || '',
  name: objRecipe.strMeal || objRecipe.strDrink,
  image: objRecipe.strDrinkThumb || objRecipe.strMealThumb,
});

const removeRecipeInArray = (local, idRecipe) => {
  const newArrRecipes = local.filter((el) => el.id !== idRecipe);
  localStorage.setItem(KEY, JSON.stringify(newArrRecipes));
};

const saveRecipeFavorites = (recipe) => {
  if (JSON.parse(localStorage.getItem(KEY)) === null) {
    const objRecipe = objectToBeSaved(recipe);
    const creatArr = initialState.concat(objRecipe);
    localStorage.setItem(KEY, JSON.stringify(creatArr));
  } else {
    const idRecipe = recipe.idDrink || recipe.idMeal;
    const local = JSON.parse(localStorage.getItem(KEY));
    if (local.every((el) => el.id !== idRecipe)) {
      const isSaveRecipe = objectToBeSaved(recipe);
      const newArrRecipes = local.concat(isSaveRecipe);
      localStorage.setItem(KEY, JSON.stringify(newArrRecipes));
    } else {
      removeRecipeInArray(local, idRecipe);
    }
  }
};

const getLocalStorageRecipesFavorite = () => {
  if (JSON.parse(localStorage.getItem(KEY))) {
    return JSON.parse(localStorage.getItem(KEY));
  }
  localStorage.setItem(KEY, JSON.stringify(initialState));
  return initialState;
};

const getRecipeFavoriteById = (idRecipe) => {
  if (JSON.parse(localStorage.getItem(KEY)) === null) {
    return false;
  }
  const local = JSON.parse(localStorage.getItem(KEY));
  if (local.some((el) => el.id === idRecipe)) {
    // const recipeStorage = local.find((el) => el.id === idRecipe);
    return true;
  }
  return false;
};

export {
  saveRecipeFavorites,
  getLocalStorageRecipesFavorite,
  getRecipeFavoriteById,
};
