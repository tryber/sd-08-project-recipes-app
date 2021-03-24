const baseURLFoods = 'https://www.themealdb.com/api/json/v1/1/';
const baseURLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
<<<<<<< HEAD
const drinksRecomended = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodsRecomended = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
=======
const filterFoodCategories = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const filterDrinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

>>>>>>> main-group-9
export const filterRecipes = async (title, filter, query) => {
  const URL = title === 'Comidas' ? baseURLFoods : baseURLDrinks;
  const type = filter === 'i' ? 'filter.php?' : 'search.php?';
  const response = await fetch(`${URL}${type}${filter}=${query}`);
  if (title === 'Comidas') {
    const { meals } = await response.json();
    return meals;
  }
  const { drinks } = await response.json();
  return drinks;
};

export const getAllRecipes = async (title) => {
  const URL = title === 'Comidas' ? allMeals : allDrinks;
  const response = await fetch(URL);
  if (title === 'Comidas') {
    const { meals } = await response.json();
    return meals;
  }
  const { drinks } = await response.json();
  return drinks;
};

export const getCategories = async (title) => {
  const numberOfCategories = 5;
  const URL = title === 'Comidas' ? foodsCategories : drinksCategories;
  const response = await fetch(URL);
  if (title === 'Comidas') {
    const { meals } = await response.json();
    return meals.slice(0, numberOfCategories);
  }
  const { drinks } = await response.json();
  return drinks.slice(0, numberOfCategories);
};
<<<<<<< HEAD
export const recomendedRecipes = async (title) => {
  const URL = title === 'Comidas' ? drinksRecomended : foodsRecomended;
  const response = await fetch(URL);
  if (title === 'Comidas') {
    const { drinks } = await response.json();
    return drinks;
  }
  const { meals } = await response.json();
  return meals;
=======

export const getFilterCategories = async (title, value) => {
  const URL = title === 'Comidas' ? filterFoodCategories : filterDrinksCategories;
  const response = await fetch(URL + value);
  if (title === 'Comidas') {
    const { meals } = await response.json();
    return meals;
  }
  const { drinks } = await response.json();
  return drinks;
>>>>>>> main-group-9
};
