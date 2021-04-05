const FOOD_API = 'https://www.themealdb.com/api.php';
const DRINK_API = 'https://www.thecocktaildb.com/api.php';
const FOOD_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const FILTER_FOODS_API = 'https://www.themealdb.com/api/json/v1/1/filter.php';
const FILTER_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
const FILTER_DRINK_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const getFoodFiltredById = async (id) => {
  const api = await fetch(FOOD_DETAILS + id, { 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true });
  const { meals } = await api.json();
  console.log('foods', meals);
  const res = { ...meals[0] };
  return res;
};

export const getDrinkFiltredById = async (id) => {
  const api = await fetch(FILTER_DRINK_ID + id, { 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true });
  const { drinks } = await api.json();
  console.log('dr', drinks);
  const res = { ...drinks[0] };
  return res;
};

export const getRandomRecipe = async (query, currentPage) => {
  // lists:
  // FoodApi: (c)ategories, (i)ngredients, (a)rea;
  // DrinkApi: (c)ategories, (g)lasses, (i)ngredients or (a)lcoholic filters;
  const RANDOM_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';
  const api = await fetch(`${RANDOM_API}${query}.php`);
  const result = await api.json();
  return result;
};
export const showCompleteLists = async (query, currentPage) => {
  // lists:
  // FoodApi: (c)ategories, (i)ngredients, (a)rea;
  // DrinkApi: (c)ategories, (g)lasses, (i)ngredients or (a)lcoholic filters;
  const LIST_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
  const api = await fetch(`${LIST_API}?${query.charAt(0)}=list`);
  const result = await api.json();
  return result;
};

export const filterArea = async (query, currentPage) => {
  const AREA_API = currentPage === 'Foods'
    ? FILTER_FOODS_API
    : FILTER_DRINKS_API;
  const api = await fetch(`${AREA_API}?a=${query}`);
  const result = await api.json();
  console.log(result);
  return result;
};

export const filterCategory = async (query, currentPage) => {
  const CATEGORY_API = currentPage === 'Foods'
    ? FILTER_FOODS_API
    : FILTER_DRINKS_API;
  const api = await fetch(`${CATEGORY_API}?c=${query}`);
  const result = await api.json();
  console.log(result);
  return result;
};
export const filterIngredient = async (query, currentPage) => {
  const INGREDIENT_API = currentPage === 'Drinks'
    ? FILTER_DRINKS_API
    : FILTER_FOODS_API;
  const api = await fetch(`${INGREDIENT_API}?i=${query}`);
  const result = await api.json();
  console.log(result);
  return result;
};

export const filterName = async (query, currentPage) => {
  const SEARCH_BASE_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

  const api = await fetch(`${SEARCH_BASE_API}?s=${query}`);
  const result = await api.json();
  return result;
};

export const filterFirstLetter = async (query, currentPage) => {
  const SEARCH_BASE_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

  const api = await fetch(`${SEARCH_BASE_API}?f=${query}`);
  const result = await api.json();
  return result;
};

export const apiFood = async () => {
  const api = await fetch(FOOD_API);
  const result = await api.json();
  return result;
};

export const apiFoodId = async (id) => {
  const api = await fetch(FOOD_DETAILS + id);
  const result = await api.json();
  return result;
};

export const apiDrink = async () => {
  const api = await fetch(DRINK_API);
  const result = await api.json();
  return result;
};

export const apiDrinkId = async (id) => {
  const api = await fetch(DRINK_DETAILS + id);
  const result = await api.json();
  return result;
};
