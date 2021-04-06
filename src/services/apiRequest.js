export const EpCategories = 'list.php?c=list';
export const EpAllRecipes = 'search.php?s=';
export const EpRecipesByFirstLetter = 'search.php?f=';
export const EpRecipesByCategory = 'filter.php?c=';
export const EpIngredients = 'list.php?i=list';
export const EpRecipesByIngredients = 'filter.php?i=';
export const EpRecipesByAreas = 'filter.php?a=';
export const EpRecipesByArea = 'list.php?a=list';

const getApiData = async (type, endPoint, value = '') => {
  const requestPattern = {
    food: {
      endPointPattern: 'https://www.themealdb.com/api/json/v1/1/',
      recipeKey: 'meals',
    },
    drink: {
      endPointPattern: 'https://www.thecocktaildb.com/api/json/v1/1/',
      recipeKey: 'drinks',
    },
  };
  const { endPointPattern, recipeKey } = requestPattern[type];

  return fetch(`${endPointPattern}${endPoint}${value}`)
    .then((resp) => resp.json())
    .then((data) => data[recipeKey])
    .catch(console.log);
};

export default getApiData;
