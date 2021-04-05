const mealBaseURL = 'https://www.themealdb.com/api/json/v1/1';
const beverageBaseURL = 'https://www.thecocktaildb.com/api/json/v1/1';
const alertMessage = 'Sua busca deve conter somente 1 (um) caracter';
const TYPES = {
  INGRENDIENT: 'ingredient',
  NAME: 'name',
  FIRST_LETTER: 'first-letter',
  CATEGORIES: 'categories',
  FIRST_FETCH: 'firstFetch',
  CATEGORIES_LIST: 'categoriesList',
  RECIPE: 'recipe',
};

export const fetchDetails = async (id, api) => {
  let url = '';
  if (api === 'meal') url = `${mealBaseURL}/lookup.php?i=${id}`;
  else url = `${beverageBaseURL}/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return Object.values(data)[0][0];
};

export const fetchMeal = async (value, type) => {
  let url = '';
  switch (type) {
  case TYPES.INGRENDIENT:
    url = `${mealBaseURL}/filter.php?i=${value}`;
    break;
  case TYPES.NAME:
    url = `${mealBaseURL}/search.php?s=${value}`;
    break;
  case TYPES.FIRST_LETTER:
    url = `${mealBaseURL}/search.php?f=${value}`;
    break;
  case TYPES.CATEGORIES:
    url = `${mealBaseURL}/filter.php?c=${value}`;
    break;
  case TYPES.FIRST_FETCH:
    url = `${mealBaseURL}/search.php?s=`;
    break;
  case TYPES.CATEGORIES_LIST:
    url = `${mealBaseURL}/list.php?c=list`;
    break;
  case TYPES.RECIPE:
    url = `${mealBaseURL}/lookup.php?i=${value}`;
    break;
  default:
    break;
  }

  if (type === TYPES.FIRST_LETTER && value.length > 1) {
    window.alert(alertMessage);
    return null;
  }

  if (url === '') return null;
  const response = await fetch(url);
  const { meals } = await response.json();
  const empty = [];
  return meals || empty;
};

export const fetchDrinks = async (value, type) => {
  let url = '';
  switch (type) {
  case TYPES.INGRENDIENT:
    url = `${beverageBaseURL}/filter.php?i=${value}`;
    break;
  case TYPES.NAME:
    url = `${beverageBaseURL}/search.php?s=${value}`;
    break;
  case TYPES.FIRST_LETTER:
    url = `${beverageBaseURL}/search.php?f=${value}`;
    break;
  case TYPES.CATEGORIES:
    url = `${beverageBaseURL}/filter.php?c=${value}`;
    break;
  case TYPES.FIRST_FETCH:
    url = `${beverageBaseURL}/search.php?s=`;
    break;
  case TYPES.CATEGORIES_LIST:
    url = `${beverageBaseURL}/list.php?c=list`;
    break;
  case TYPES.RECIPE:
    url = `${beverageBaseURL}/lookup.php?i=${value}`;
    break;
  default:
    break;
  }

  if (type === TYPES.FIRST_LETTER && value.length > 1) {
    window.alert(alertMessage);
    return null;
  }

  if (url === '') return null;
  const response = await fetch(url);
  const { drinks } = await response.json();
  const empty = [];
  return drinks || empty;
};

export const fetchApi = async (value, type, api) => {
  if (api === 'comidas') return fetchMeal(value, type);
  return fetchDrinks(value, type);
};

export const fetchRandom = async (type) => {
  let url = '';
  const TYPE_RESULT_MEAL = 'meals';
  const TYPE_RESULT_DRINK = 'drinks';
  switch (type) {
  case 'comidas':
    url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    break;
  case 'bebidas':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    break;
  default:
    break;
  }

  const response = await fetch(url);
  const results = await response.json();
  if (type === 'comidas') return results[TYPE_RESULT_MEAL][0].idMeal;
  return results[TYPE_RESULT_DRINK][0].idDrink;
};

export const fetchByIngredients = async (type) => {
  const MAX_LENGTH = 12;
  const MIN_LENGTH = 0;
  let url = '';
  switch (type) {
  case 'comidas':
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    break;
  case 'bebidas':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    break;
  default:
    break;
  }

  const response = await fetch(url);
  const results = await response.json();
  if (type === 'comidas') return results.meals.slice(MIN_LENGTH, MAX_LENGTH);
  return results.drinks.slice(MIN_LENGTH, MAX_LENGTH);
};

export const fetchAreas = async () => {
  const areasBaseUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const allAreasResponse = await fetch(areasBaseUrl);
  const allAreasJSON = await allAreasResponse.json();
  const allAreas = allAreasJSON.meals.map((area) => area.strArea);
  allAreas.unshift('All');
  return allAreas;
};

export const fetchMealsByArea = async (area) => {
  const MAX_LENGTH = 12;
  const MIN_LENGTH = 0;
  const mealsByAreaBaseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const mealsNoFilter = 'https://www.themealdb.com/api/json/v1/1/search.php?s= ';
  if (area === 'All') {
    const allRecipesResponse = await fetch(mealsNoFilter);
    const allRecipesResults = await allRecipesResponse.json();
    return allRecipesResults.meals.slice(MIN_LENGTH, MAX_LENGTH);
  }
  const mealsAreaResponse = await fetch(mealsByAreaBaseUrl);
  const allMealsByArea = await mealsAreaResponse.json();
  return allMealsByArea.meals.slice(MIN_LENGTH, MAX_LENGTH);
};
