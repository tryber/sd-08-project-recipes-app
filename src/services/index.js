const MEAL_API = 'https://www.themealdb.com/api/';
const COCKTAIL_API = 'https://www.thecocktaildb.com/api/';

export const headerSearch = async (search, type, typeAPI) => {
  const apiBase = typeAPI ? COCKTAIL_API : MEAL_API;
  let results = {};
  if (type === 'ingredients') {
    results = await fetch(`${apiBase}json/v1/1/filter.php?i=${search}`)
      .then((response) => response.json());
  } else if (type === 'name') {
    results = await fetch(`${apiBase}json/v1/1/search.php?s=${search}`)
      .then((response) => response.json());
  } else {
    if (search.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    results = await fetch(`${apiBase}json/v1/1/search.php?f=${search}`)
      .then((response) => response.json());
  }
  return results;
};

export const fetchFood = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  return result;
};

export const fetchDrink = async () => {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  // console.log(result);
  return result;
};
export const categoryFood = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json());
  // console.log(result.meals);
  return result.meals;
};
export const categoryDrink = async () => {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json());
  // console.log(result);
  return result.drinks;
};
export const seachFoodByCategory = async (search) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
    .then((response) => response.json());
  console.log(result.meals);
  return result.meals;
};
export const seachDrinkByCategory = async (search) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`)
    .then((response) => response.json());
  return result.drinks;
};

export const fetchProductDetailsById = async (id, type) => {
  const API_LINK = type === 'comidas'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(API_LINK);
  const json = await result.json();
  return json;
};

export const fetchRecomendationsCard = async (type) => {
  const API_LINK = type === 'comidas'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(API_LINK);
  const json = await result.json();
  const arrays = Object.values(json)[0];
  const recommendationLimit = 6;
  const x = [];

  for (let i = 0; i < recommendationLimit; i += 1) {
    x.push(arrays[i]);
  }
  return x;
};

export const fetchSurprised = async (type) => {
  const API_LINK = type === 'comidas'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const result = await fetch(API_LINK);
  const json = await result.json();
  return json;
};

export const ingredients = async (type) => {
  const API_LINK = type === 'comidas'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    // -> json(object) -> {meals:[{id, ingred, descrip, type}, {}...]}
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    // -> json(object) -> {drinks:[{ingred}, {}...]}
  const result = await fetch(API_LINK);
  const json = await result.json();
  return json;
};

export const fetchMealsByArea = async (area) => {
  let results = [];
  if (area) {
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    results = await apiRequest.json();
  } else {
    results = await fetchFood();
  }

  return results.meals;
};

export const fetchAreas = async () => {
  const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const results = await apiRequest.json();
  return results.meals.map(({ strArea }) => strArea);
};
