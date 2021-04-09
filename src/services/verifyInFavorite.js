function verifyInFavorite(recipe, type, status) {
  const { strCategory, strAlcoholic } = recipe;
  let mealOrDrink = 'comida';
  let area = recipe.strArea;
  let alcoholicOrNot = '';

  if (type === 'Drink') {
    mealOrDrink = 'bebida';
    area = '';
    alcoholicOrNot = strAlcoholic;
  }

  let favoriteRecipes = [{
    id: recipe[`id${type}`],
    type: mealOrDrink,
    area,
    category: strCategory,
    alcoholicOrNot,
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
  }];
  const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (!status) {
    if (!favoriteStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoriteStorage.concat(favoriteRecipes)));
    }
  } else {
    favoriteRecipes = favoriteStorage.filter((item) => item.id !== favoriteRecipes[0].id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
}

export default verifyInFavorite;
