export async function fetchFoodApiByName(name) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodApiByLetter(letter) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodApiById(id) {
  if (!id) return;
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return meals[0];
}

export async function fetchFoodApiByIngredient(ingredient) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodRecomendation() {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  const MIN = 0;
  const MAX = 6;
  const sixMeals = [...meals].slice(MIN, MAX);
  return [...sixMeals];
}

export async function fetchDrinkApiByName(name) {
  const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json());
  return drinks;
}

export async function fetchDrinkApiByLetter(letter) {
  const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json());
  return drinks;
}

export async function fetchDrinkApiById(id) {
  const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return drinks[0];
}

export async function fetchDrinkApiByIngredient(ingredient) {
  const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`)
    .then((response) => response.json());
  return drinks;
}

export async function fetchDrinkRecomendation() {
  const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  const MIN = 0;
  const MAX = 6;
  const sixDrinks = [...drinks].slice(MIN, MAX);
  return [...sixDrinks];
}

export function addFoodToFavorite(recipe, foodOrDrink) {
  const {
    strMealThumb,
    strMeal,
    strCategory,
    idMeal,
    strDrinkThumb,
    strDrink,
    idDrink,
    strArea,
    strAlcoholic,
  } = recipe;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    const isFavorite = favoriteRecipes
      .find((e) => e.id === recipe.idMeal || e.id === idDrink);
    if (isFavorite) {
      const removed = favoriteRecipes.filter((e) => e.id !== isFavorite.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
      return false;
    }
  }
  const newFavorite = {
    id: idMeal || idDrink,
    type: foodOrDrink,
    area: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
  };
  if (favoriteRecipes) {
    const newList = [...favoriteRecipes, newFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    return true;
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
  return true;
}

export function removeFromFavorite(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const alreadyOnFavorite = favoriteRecipes.some((e) => e.id === id);
  const removed = favoriteRecipes.filter((e) => e.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
  return alreadyOnFavorite;
}

export function getIngredientList(recipe) {
  return Object.keys(recipe).reduce((acc, currentKey) => {
    if (recipe[currentKey] && currentKey.includes('strIngredient')) {
      const measure = currentKey.replace('strIngredient', 'strMeasure');
      return { ...acc,
        [currentKey]: {
          item: recipe[currentKey],
          quantity: recipe[measure],
        } };
    }
    return acc;
  },
  {});
}

export function recipeIsDone(id) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!id || !doneRecipes) return false;
  const checkIfDone = doneRecipes.some((e) => e.id === id);
  return checkIfDone;
}

export function continueRecipe(id, foodOrDrink) {
  const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!id || !foodOrDrink || !continueRecipes) return false;
  let inProgessKey;
  if (foodOrDrink === 'bebidas') {
    inProgessKey = 'cocktails';
  } else {
    inProgessKey = 'meals';
  }
  return Object.keys(continueRecipes[inProgessKey]).some((e) => e === id);
}

export function isFavoriteRecipe(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!id || !favoriteRecipes) return false;
  return favoriteRecipes.some((e) => e.id === id);
}

const URLFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URLList = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const fetchAPIFood = async () => {
  try {
    const response = await fetch(URLFood);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchListArea = async () => {
  try {
    const request = await fetch(URLList);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFoodsAreaName = async (name) => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomDrink = async () => {
  try {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const drink = await fetch(URL).then((response) => response.json());
    return drink;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomFood = async () => {
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const food = await fetch(URL).then((response) => response.json());
    return food;
  } catch (error) {
    console.log(error);
  }
};
