const storageRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

export default function setLocalStorage(id) {
  const recipe = JSON.stringify({ meals: { id }, cocktails: {} });
  localStorage.setItem('inProgressRecipes', recipe);
}

export function initFavoriteRecipes() {
  if (storageRecipe === null) {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([]));
  }
}
