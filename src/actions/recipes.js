import { ADD_CATEGORIES, ADD_FAVORITE, ADD_FILTER, ADD_RECIPES,
  ADD_RECOMMENDATIONS, END_RECIPE, REQUEST_RECIPES, RM_FAVORITE,
  START_RECIPE, ADD_BYINGREDIENT, ADD_COUNTRIES } from './index';

const addRecipes = (payload) => ({
  type: ADD_RECIPES,
  payload,
});

const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

const addFilter = (payload) => ({
  type: ADD_FILTER,
  payload,
});

const formatedObject = (obj, type) => {
  const apiType = type === 'comidas' ? 'Meal' : 'Drink';
  const { strArea: area = '', strCategory: category = '',
    strAlcoholic: alcoholicOrNot = '', [`str${apiType}`]: name,
    [`str${apiType}Thumb`]: image, strTags } = obj;
  const tags = !strTags ? [] : strTags.split(',');
  const idApi = `id${apiType}`;
  const id = obj[idApi];
  const searchObject = {
    id, area, category, alcoholicOrNot, name, image, type: type.slice(0, 0 - 1), tags };
  // if (key === 'i') {
  //   const IngredientKeys = Object.keys(obj)
  //     .filter((ingKey) => (
  //       ingKey
  //         .startsWith('strIngredient')
  //     && obj[ingKey] !== '' && obj[ingKey] !== null));
  //   const measureKeys = IngredientKeys
  //     .map((_, index) => obj[`strMeasure${index + 1}`]);
  //   const ingredients = IngredientKeys
  //     .reduce((acc, curr) => ({ ...acc, [curr]: obj[curr] }), {});
  //   const measures = measureKeys
  //     .reduce((acc, curr) => ({ ...acc, [curr]: obj[curr] }), {});
  //   return { ...searchObject, ...ingredients, ...measures };
  // }
  return { ...obj, ...searchObject };
};

export const fetchRecipes = (token, type = 'comidas',
  { request = 'search', key = 's', parameter = '' } = {}) => (
  async (dispatch) => {
    const filter = request === 'filter' ? parameter : '';
    dispatch(addFilter(filter));
    dispatch(requestRecipes());
    const typeApi = type === 'comidas' ? 'meals' : 'drinks';
    const domains = { comidas: 'themealdb', bebidas: 'thecocktaildb' };
    let url = `https://www.${domains[type]}.com/api/json/v1/${token}/${request}.php?${key}=${parameter}`;
    if (!key) url = `https://www.${domains[type]}.com/api/json/v1/${token}/${request}.php`;
    try {
      const data = await fetch(url);
      const { [typeApi]: recipes } = await data.json();
      dispatch(addRecipes(recipes.map((recipe) => formatedObject(recipe, type))));
    } catch (error) {
      dispatch(addRecipes([]));
    }
  }
);

const addCategories = (payload) => ({
  type: ADD_CATEGORIES,
  payload,
});

export const fetchCategories = (token, type = 'comidas') => (
  async (dispatch) => {
    const urlOpt = { comidas: `https://www.themealdb.com/api/json/v1/${token}/list.php?c=list`,
      bebidas: `https://www.thecocktaildb.com/api/json/v1/${token}/list.php?c=list` };
    const data = await fetch(urlOpt[type]);
    const typeApi = type === 'comidas' ? 'meals' : 'drinks';
    const { [typeApi]: categories } = await data.json();
    const CATEGORIES_NUMBER = 5;
    const categoriesArray = categories.slice(0, CATEGORIES_NUMBER)
      .map(({ strCategory }) => strCategory);
    dispatch(addCategories(categoriesArray));
  }
);

const addRecommendations = (payload) => ({
  type: ADD_RECOMMENDATIONS,
  payload,
});

export const fetchRecommendations = (token, type = 'comidas') => (
  async (dispatch) => {
    const domains = { comidas: 'themealdb', bebidas: 'thecocktaildb' };
    const url = `https://www.${domains[type]}.com/api/json/v1/${token}/search.php?s=`;
    const data = await fetch(url);
    const typeApi = type === 'comidas' ? 'meals' : 'drinks';
    const { [typeApi]: recipes } = await data.json();
    dispatch(addRecommendations(recipes.map((recipe) => formatedObject(recipe, type))));
  }
);

export const startRecipe = (selectedType, payload) => ({
  selectedType,
  type: START_RECIPE,
  payload,
});

export const endRecipe = (payload) => ({
  type: END_RECIPE,
  payload,
});

export const addFavorite = (payload) => ({
  type: ADD_FAVORITE,
  payload,
});

export const removeFavorite = (payload) => ({
  type: RM_FAVORITE,
  payload,
});

export const byAddIngredient = (payload) => ({
  type: ADD_BYINGREDIENT,
  payload,
});

const addAreas = (payload) => ({
  type: ADD_COUNTRIES,
  payload,
});

export const fetchAreas = (token) => (
  async (dispatch) => {
    const url = `https://www.themealdb.com/api/json/v1/${token}/list.php?a=list`;
    const data = await fetch(url);
    const areas = await data.json();
    dispatch(addAreas(areas));
  }
);
