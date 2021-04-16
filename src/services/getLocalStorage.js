export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.email;
};

export const getInProgressMeals = () => {
  if (localStorage.getItem('inProgressRecipes')) {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    return inProgressRecipes.meals;
  }
  return null;
};

export const getInProgressCocktails = () => {
  if (localStorage.getItem('inProgressRecipes')) {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    return inProgressRecipes.cocktails;
  }
  return null;
};

export const getDoneRecipes = () => {
  if (localStorage.getItem('doneRecipes') === null) {
    return [];
  }
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return doneRecipes;
};

export const nameButtonRecipe = (id, type) => {
  if (getDoneRecipes().some((recipe) => recipe.id === id)) return 'none';
  const startRecipe = 'Iniciar Receita';
  const continueRecipe = 'Continuar Receita';
  if (type === 'Comidas') {
    const meals = getInProgressMeals();
    if (!meals) return startRecipe;
    return Object.keys(meals).includes(id) ? continueRecipe : startRecipe;
  }
  if (type === 'Bebidas') {
    const drinks = getInProgressCocktails();
    if (!drinks) return startRecipe;
    return Object.keys(drinks).includes(id) ? continueRecipe : startRecipe;
  }
};

export const getFavoriteRecipes = () => {
  if (localStorage.favoriteRecipes) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes;
  }
  return null;
};

export const getHeartType = (id) => {
  const favoriteRecipes = getFavoriteRecipes();
  if (favoriteRecipes === null) return false;
  return favoriteRecipes.some((favorite) => favorite.id === id);
};

export const getIngredientsFinished = (type, id) => {
  let finishedIgredients = {};
  if (type === 'Comidas') {
    finishedIgredients = getInProgressMeals();
  }
  if (type === 'Bebidas') {
    finishedIgredients = getInProgressCocktails();
  }
  if (finishedIgredients !== null) {
    return finishedIgredients[id];
  }
  return [];
};
