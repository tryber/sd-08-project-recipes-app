const END_POINTS = {
  FOODS: {
    random: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    category: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    region: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
    regions: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    ingredients: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    byLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    filterCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    details: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  },
  DRINKS: {
    random: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    category: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    region: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=',
    regions: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    ingredients: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    byLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    filterCategory: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
    details: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  },
};

const fetchAPI = (andPoint) => fetch(andPoint).then((response) => response
  .json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealsByName = (name) => fetchAPI(`${END_POINTS.FOODS.name}${name}`);

export const getDrinksByName = (name) => fetchAPI(`${END_POINTS.DRINKS.name}${name}`);

export const getMealsByLetter = (byLetter) => fetchAPI(`${END_POINTS.FOODS
  .byLetter}${byLetter}`);

export const getDrinksByLetter = (byLetter) => fetchAPI(`${END_POINTS.DRINKS
  .byLetter}${byLetter}`);

export const getMealsIngredient = (ingredient) => fetchAPI(`${END_POINTS
  .FOODS
  .ingredient}${ingredient}`);
export const getMealsIngredients = (ingredient) => fetchAPI(`${END_POINTS
  .FOODS
  .ingredients}${ingredient}`);

export const getDrinksIngredients = (ingredient) => fetchAPI(`${END_POINTS.DRINKS
  .ingredients}${ingredient}`);

export const getDrinksIngredient = (ingredient) => fetchAPI(`${END_POINTS.DRINKS
  .ingredient}${ingredient}`);

export const getMealsByCategories = () => fetchAPI(END_POINTS.FOODS.category);

export const getDrinksByCategories = () => fetchAPI(END_POINTS.DRINKS.category);

export const getMealsDetails = (id) => fetchAPI(`${END_POINTS.FOODS
  .details}${id}`);

export const getDrinksDetails = (id) => fetchAPI(`${END_POINTS.DRINKS
  .details}${id}`);

export const getMealsByRandom = () => fetchAPI(END_POINTS.FOODS.random);

export const getDrinksByRandom = () => fetchAPI(END_POINTS.DRINKS.random);

export const getMealsByRegions = () => fetchAPI(END_POINTS.FOODS.regions);

export const getDrinksByRegions = () => fetchAPI(END_POINTS.DRINKS.regions);

export const getMealsByRegion = (region) => fetchAPI(END_POINTS.FOODS.region + region);

export const getDrinksByRegion = (region) => fetchAPI(END_POINTS.DRINKS.region + region);

export const getMealsByCategory = (
  category,
) => fetchAPI(`${END_POINTS.FOODS.filterCategory}${category}`);

export const getDrinksByCategory = (
  category,
) => fetchAPI(`${END_POINTS.DRINKS.filterCategory}${category}`);

export default fetchAPI;
