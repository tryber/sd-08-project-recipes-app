import fetchEndpoint from './utils';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const getIngredients = () => (
  fetchEndpoint(`${BASE_URL}/list.php?i=list`)
);

export const getCategories = () => (
  fetchEndpoint(`${BASE_URL}/list.php?c=list`)
);

export const getAreas = () => (
  fetchEndpoint(`${BASE_URL}/list.php?a=list`)
);

export const getByIngredient = (ingredient) => (
  fetchEndpoint(`${BASE_URL}/filter.php?i=${ingredient}`)
);

export const getByName = (name = '') => (
  fetchEndpoint(`${BASE_URL}/search.php?s=${name}`)
);

export const getByFirstLetter = (firstLetter) => (
  fetchEndpoint(`${BASE_URL}/search.php?f=${firstLetter}`)
);

export const getByCategory = (category) => (
  fetchEndpoint(`${BASE_URL}/filter.php?c=${category}`)
);

export const getById = (id) => (
  fetchEndpoint(`${BASE_URL}/lookup.php?i=${id}`)
);

export const getRandom = () => (
  fetchEndpoint(`${BASE_URL}/random.php`)
);
