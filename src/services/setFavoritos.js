const setComidaFavorita = (recipeObject) => {
  console.log('entrou no if comidas');
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const allKeys = Object.keys(recipeObject);

  const objeto = {
    id: recipeObject.idMeal,
    type: 'comida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strMeal,
    image: recipeObject.strMealThumb,
  };

  const updateFav = [
    ...favoriteRecipes,
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

const setComidaFavoritaElse = (recipeObject) => {
  console.log('entrou no if comidas');

  const allKeys = Object.keys(recipeObject);

  const objeto = {
    id: recipeObject.idMeal,
    type: 'comida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strMeal,
    image: recipeObject.strMealThumb,
  };

  const updateFav = [
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

const setBebidaFavorita = (recipeObject) => {
  console.log('entrou no if Bebidas');
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const allKeys = Object.keys(recipeObject);

  const objeto = {
    id: recipeObject.idDrink,
    type: 'bebida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strDrink,
    image: recipeObject.strDrinkThumb,
  };

  const updateFav = [
    ...favoriteRecipes,
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

const setBebidaFavoritaElse = (recipeObject) => {
  console.log('entrou no if bebidas');

  const allKeys = Object.keys(recipeObject);

  const objeto = {
    id: recipeObject.idDrink,
    type: 'bebida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strDrink,
    image: recipeObject.strDrinkThumb,
  };

  const updateFav = [
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

const isfavoriteRecipe = (idRecipe, callback) => {
  if (localStorage.getItem('favoriteRecipes') !== null) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    callback(favoriteRecipes.some((elem) => elem.id === idRecipe));
  }
};

const setFavoritos = (recipeObject, url, id, callback) => {
  console.log('inicio');
  if (localStorage.getItem('favoriteRecipes') !== null) {
    console.log('entrou no if');

    if (url.includes('comida')) {
      setComidaFavorita(recipeObject);
    }
    if (url.includes('bebida')) {
      setBebidaFavorita(recipeObject);
    }
  } else {
    if (url.includes('comida')) {
      setComidaFavoritaElse(recipeObject);
    }
    if (url.includes('bebida')) {
      setBebidaFavoritaElse(recipeObject);
    }
  }
  isfavoriteRecipe(id, callback);
};

export { isfavoriteRecipe };
export default setFavoritos;
