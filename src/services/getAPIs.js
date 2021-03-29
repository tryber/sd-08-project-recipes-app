export const getMealCategories = async () => {
  const Url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getRandomMeal = async () => {
  const Url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals[0];
};

export const getMealsAllIngredients = async () => {
  const Url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealsByCategory = async (byCategory) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${byCategory}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealByIngredients = async (ingredient) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealByName = async (name) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealByFirstLetter = async (FirstLetter) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealRecipesDetails = async (idRecipe) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals[0];
};

export const getDrinksCategories = async () => {
  const Url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getRandomDrinks = async () => {
  const Url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks[0];
};

export const getDrinksByCategory = async (byCategory) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${byCategory}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkByIngredients = async (ingredient) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkByName = async (name) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkByFirstLetter = async (FirstLetter) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${FirstLetter}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getMealsDetails = async (byId) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${byId}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getDrinksDetails = async (byId) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${byId}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkRecipesDetails = async (idRecipe) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks[0];
};

export const getDrinksAllIngredients = async () => {
  const Url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};
