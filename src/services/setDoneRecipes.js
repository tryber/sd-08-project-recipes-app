const MAX_MONTH = 10;
const getCurrentDate = () => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return (
    `${year}/${month < MAX_MONTH
      ? `0${month}` : `${month}`}/${date}`);
};

const setDoneFood = (recipeObject) => {
  console.log('entrou no if comidas');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

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
    doneDate: getCurrentDate(),
    tags: recipeObject.strTags !== null
      ? recipeObject.strTags.split(',').map((elem) => elem)
      : '',
  };

  const updateDone = [
    ...doneRecipes,
    objeto,
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(updateDone));
};

const setDoneFoodElse = (recipeObject) => {
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
    doneDate: getCurrentDate(),
    tags: recipeObject.strTags.split(',').map((elem) => elem),
  };

  const updateFav = [
    objeto,
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(updateFav));
};

const setDoneDrink = (recipeObject) => {
  console.log('entrou no if Bebidas');
  const favoriteRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

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
    doneDate: getCurrentDate(),
    tags: '',
  };

  const updateFav = [
    ...favoriteRecipes,
    objeto,
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(updateFav));
};

const setDoneDrinkElse = (recipeObject) => {
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
    doneDate: getCurrentDate(),
    tags: '',
  };

  const updateFav = [
    objeto,
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(updateFav));
};

const setDoneRecipes = (recipeObject, url) => {
  console.log('inicio');
  if (localStorage.getItem('doneRecipes') !== null) {
    console.log('entrou no if');

    if (url.includes('comidas')) {
      setDoneFood(recipeObject);
    }
    if (url.includes('bebidas')) {
      setDoneDrink(recipeObject);
    }
  } else {
    if (url.includes('comidas')) {
      setDoneFoodElse(recipeObject);
    }
    if (url.includes('bebidas')) {
      setDoneDrinkElse(recipeObject);
    }
  }
};

export default setDoneRecipes;
