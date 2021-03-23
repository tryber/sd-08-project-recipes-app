export const headerSearch = async (search, type) => {
  let results = {};
  if (type === 'ingredients') {
    results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)
      .then((response) => response.json());
  } else if (type === 'name') {
    results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json());
  } else {
    if (search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
      .then((response) => response.json());
  }
  return results;
};

const MEAL_API = 'https://www.themealdb.com/api/';
const COCKTAIL_API = 'https://www.thecocktaildb.com/api/';

export const fetchFood = async () => {
  const result = await fetch(`${MEAL_API}json/v1/1/random.php`);
  const json = await result.json();
  return json;
};

export const fetchDrink = async () => {
  const result = await fetch(`${COCKTAIL_API}json/v1/1/random.php`);
  const json = await result.json();
  return json;
};

export const fetchProductDetailsById = async (id, type) => {
  const API_LINK = type === 'comidas'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(API_LINK);
  const json = await result.json();
  return json;
};
