import { indexOf } from 'lodash-es';
import React from 'react';
import { login } from '../constants/index';

export const validateEmail = (email) => {
  if (login.VALID_EMAIL_REGEX.test(email)) {
    return true;
  }
  // window.alert('You have entered an invalid email address!');
  return false;
};

export const validatePassword = (password) => {
  if (password.length < login.MIN_PASSWORD_LENGTH) {
    return false;
  }
  // window.alert('You have entered an invalid email address!');
  return true;
};

export const filterIngredients = (recipe) => Object.entries(recipe)
  .filter((ingredientIndex) => ingredientIndex[0].startsWith('strIngredient'))
  .filter((ingredientIndex) => ingredientIndex[1] !== '')
  .filter((ingredientIndex) => ingredientIndex[1] !== null)
  .map((ingredientIndex) => ingredientIndex[1]);

export const filterIngredientsAndMeasures = (recipe) => {
  const arrayFromObject = Object.entries(recipe)
    .filter((ingredientIndex) => ingredientIndex[0].startsWith('strMeasure')
                || ingredientIndex[0].startsWith('strIngredient'))
    .filter((ingredientIndex) => ingredientIndex[1] !== '')
    .filter((ingredientIndex) => ingredientIndex[1] !== null);
  const ingredientMeasurePairs = [
    arrayFromObject.slice(0, arrayFromObject.length / 2),
    arrayFromObject.slice(arrayFromObject.length / 2),
  ];
  return (ingredientMeasurePairs[0].map((ingredientsString, indx) => (
    <li key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
      {ingredientsString[1]}
      {' - '}
      {ingredientMeasurePairs[1][indx][1]}
    </li>
  )));
};

export const initLocalStorage = () => {
  const isFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(isFavorite);
  const inProgessRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgessRecipes);

  if (inProgessRecipes === null) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
  }
  if (isFavorite === null) {
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([]));
  }
  return { isFavorite, inProgessRecipes };
};

export const setLocalStorage = (recipe) => {
  const inProgessRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails, meals } = inProgessRecipes;
  const ingredients = filterIngredients(recipe);
  if (inProgessRecipes) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        cocktails,
        meals: { ...meals,
          [recipe.idMeal]: ingredients } }));
  }
  localStorage.setItem('inProgressRecipes',
    JSON.stringify({
      cocktails: {},
      meals: {
        ...meals, [recipe.idMeal]: ingredients } }));
};

const favoriteObject = (meal) => {
  console.log(meal);
  if (meal.length === 0) {
    return console.log(meal);
  }
  console.log(meal);
  const object = {
    id: meal[0].idMeal,
    type: 'comida',
    area: meal[0].strArea || '',
    category: meal[0].strCategory || '',
    alcoholicOrNot: meal[0].strAlcoholic || '',
    name: meal[0].strMeal,
    image: meal[0].strMealThumb,
  };
  console.log(object);
  return object;
};
export const handleFavorite = (recipe, iFavorite) => {
  console.log('entrou no favorite useEffect');
  if (iFavorite) {
    console.log('entrou no isFavorite');
    const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favRecipe = favoriteObject(recipe);

    return favoriteArray.length <= 1 ? localStorage.setItem('favoriteRecipes',
      JSON.stringify([favRecipe])) : localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteArray, favRecipe]));
  }
  console.log('saiu do isFavorite');

  const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteArray);
  if (favoriteArray !== null && favoriteArray.length > 1) {
    const favRecipe = favoriteObject(recipe);

    console.log('entrou no delete favorite length maior que 1');
    return localStorage.setItem('favoriteRecipes', JSON.stringify([
      favoriteArray.slice(0, favoriteArray[indexOf(favRecipe)]),
      favoriteArray.slice(favoriteArray[indexOf(favRecipe)]),
    ]));
  }
};
