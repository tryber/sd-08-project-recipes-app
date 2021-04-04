export const getRecipesInProgress = () => JSON
  .parse(localStorage.getItem('inProgressRecipes')) || [];

export const getFavoriteRecipes = () => JSON
  .parse(localStorage.getItem('favoriteRecipes')) || [];

export const removeFavoriteRecipe = (recipeId) => {
  const favoriteRecipe = getFavoriteRecipes().filter(({ id }) => recipeId !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipe]));
};

export const addFavoriteRecipe = (recipe) => {
  localStorage.setItem('favoriteRecipes', JSON
    .stringify([...getFavoriteRecipes(), recipe]));
};
