const initialState = [];
const KEY_FAVORITE = 'favoriteRecipes';

const objectToBeSavedFavorite = (objRecipe) => ({
  id: objRecipe.idDrink || objRecipe.idMeal,
  type: objRecipe.idDrink ? 'bebida' : 'comida',
  area: objRecipe.strArea || objRecipe.area || '',
  category: objRecipe.strCategory,
  alcoholicOrNot: objRecipe.strAlcoholic || '',
  name: objRecipe.strMeal || objRecipe.strDrink,
  image: objRecipe.strDrinkThumb || objRecipe.strMealThumb,
});

const editObjectForPageDoneRecipe = (recipe) => ({
  id: recipe.id,
  type: recipe.type,
  area: recipe.area,
  category: recipe.category,
  alcoholicOrNot: recipe.alcoholicOrNot,
  name: recipe.nome,
  image: recipe.image,
});

const removeRecipeInArray = (local, idRecipe) => {
  const newArrRecipes = local.filter((el) => el.id !== idRecipe);
  localStorage.setItem(KEY_FAVORITE, JSON.stringify(newArrRecipes));
};

const saveRecipeFavorites = (recipe, page = false, KEY = KEY_FAVORITE) => {
  if (JSON.parse(localStorage.getItem(KEY)) === null) {
    const objRecipe = page
      ? (editObjectForPageDoneRecipe(recipe)
      ) : objectToBeSavedFavorite(recipe);
    const creatArr = initialState.concat(objRecipe);
    localStorage.setItem(KEY, JSON.stringify(creatArr));
  } else {
    let idRecipe = '';
    if (page) {
      idRecipe = recipe.id;
    } else {
      idRecipe = recipe.idDrink || recipe.idMeal;
    }
    const local = JSON.parse(localStorage.getItem(KEY));
    if (local.every((el) => el.id !== idRecipe)) {
      const isSaveRecipe = page
        ? editObjectForPageDoneRecipe(recipe)
        : objectToBeSavedFavorite(recipe);
      const newArrRecipes = local.concat(isSaveRecipe);
      localStorage.setItem(KEY, JSON.stringify(newArrRecipes));
    } else {
      removeRecipeInArray(local, idRecipe);
    }
  }
};

const getLocalStorageRecipesFavorite = () => {
  if (JSON.parse(localStorage.getItem(KEY_FAVORITE))) {
    return JSON.parse(localStorage.getItem(KEY_FAVORITE));
  }
  localStorage.setItem(KEY_FAVORITE, JSON.stringify(initialState));
  return initialState;
};

const getRecipeFavoriteById = (idRecipe) => {
  if (JSON.parse(localStorage.getItem(KEY_FAVORITE)) === null) {
    return false;
  }
  const local = JSON.parse(localStorage.getItem(KEY_FAVORITE));
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
