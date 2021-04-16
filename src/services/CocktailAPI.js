// refatora substituindo as funções fetch fetchCocktailByIngredients, fetchDrinkIngridientsFilter, fetchRecipesDrinkCats.

export function fetchDrinkByFilter(str, type) {
  const customFilterURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${type}=${str}`;

  return fetch(customFilterURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// refatora substituindo as funções fetch fetchCocktailByName, fetchCocktailByFirstLetter.

export function fetchDrinkBySearch(str, type) {
  const customSearchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${str}`;

  return fetch(customSearchURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

export function fetchRandomDrinks() {
  const randomDrinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  return fetch(randomDrinkURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

export function fetchDrinkId(id) {
  const fetchDrinkURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  return fetch(fetchDrinkURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// refatora substituindo as funções fetch fetchFistDrinkCats, fetchDrinkIngridients.

export function fetchDrinkByList(type) {
  const customListURL = `https://www.thecocktaildb.com/api/json/v1/1/list.php?${type}=list`;

  return fetch(customListURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}
