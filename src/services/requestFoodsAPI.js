const TAG_ARRAY_LENGTH = 5;
const TAG_ARRAY_LENGTH_SIX = 6;
const TAG_ARRAY_LENGTH_TWELVE = 12;

export const requestByName = async (name) => {
  const path = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestByIngredient = async (ingredient) => {
  const path = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestByFirstLetter = async (letter) => {
  const path = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestMainFoods = async () => {
  const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestCategoriesMeals = async () => {
  const path = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(path);
  const data = await response.json();
  return data.meals.slice(0, TAG_ARRAY_LENGTH);
};

export const requestFoodById = async (id) => {
  const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestFoodByCategory = async (category) => {
  const path = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestRandomMeal = async () => {
  const path = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(path);
  const data = await response.json();
  return data.meals[0].idMeal;
};

export const requestSixMeals = async () => {
  const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(path);
  const data = await response.json();
  return data.meals.slice(0, TAG_ARRAY_LENGTH_SIX);
};

export const requestIngredientsMeals = async () => {
  const path = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(path);
  const data = await response.json();
  return data.meals.slice(0, TAG_ARRAY_LENGTH_TWELVE);
};

export const requestAreasMeals = async () => {
  const path = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};

export const requestFoodsByArea = async (area) => {
  const path = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.meals;
};
