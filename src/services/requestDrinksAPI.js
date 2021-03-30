const TAG_ARRAY_LENGTH = 5;
const TAG_ARRAY_LENGTH_SIX = 6;
const TAG_ARRAY_LENGTH_TWELVE = 12;

export const requestDrinkByName = async (name) => {
  const path = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks;
};

export const requestDrinkByIngredient = async (ingredient) => {
  const path = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return null;
  }
};

export const requestDrinkByFirstLetter = async (letter) => {
  const path = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks;
};

export const requestMainDrinks = async () => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks;
};

export const requestCategoriesDrinks = async () => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks.slice(0, TAG_ARRAY_LENGTH);
};

export const requestDrinkById = async (id) => {
  const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks;
};

export const requestDrinkByCategory = async (category) => {
  const path = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks;
};

export const requestRandomDrink = async () => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks[0].idDrink;
};

export const requestSixDrinks = async () => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks.slice(0, TAG_ARRAY_LENGTH_SIX);
};

export const requestIngredientsDrinks = async () => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(path);
  const data = await response.json();
  return data.drinks.slice(0, TAG_ARRAY_LENGTH_TWELVE);
};
