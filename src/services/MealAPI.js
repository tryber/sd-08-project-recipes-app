// refatora substituindo as funções fetch fetchMealByIngredients, fetchAreaMeal, fetchRecipesMealCats, fetchMealIngridientsFilter.

export function fetchMealByFilter(str, type) {
  const customFilterURL = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${str}`;

  return fetch(customFilterURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// refatora substituindo as funções fetch fetchMealByName, fetchMealByFirstLetter.

export function fetchMealBySearch(str, type) {
  const customSearchURL = `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${str}`;

  return fetch(customSearchURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

export function fetchRandomMeal() {
  const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

  return fetch(randomMealURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

export function fetchMealId(id) {
  const fetchMealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  return fetch(fetchMealURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// refatora substituindo as funções fetch fetchAreaOptions, fetchFistMealCats, fetchIngridients.

export function fetchMealByList(type) {
  const customListURL = `https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`;

  return fetch(customListURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}
