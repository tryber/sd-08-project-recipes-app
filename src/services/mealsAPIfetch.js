// FILTERS

export function fetchMealByFilters(str, type) {
  const customURL = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${str}`;

  return fetch(customURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// export function fetchMealByIngredients(ingrediente) {
//   const fetchIngredientsURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

//   return fetch(fetchIngredientsURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchAreaMeal(area) {
//   const AreaMealURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

//   return fetch(AreaMealURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchRecipesMealCats(filter) {
//   const recipesFilteredURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;

//   return fetch(recipesFilteredURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchMealIngridientsFilter(ingredient) {
//   const recipesFilteredURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

//   return fetch(recipesFilteredURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// ****************************************

// SEARCH

export function fetchMealBySearch(str, type) {
  const customURL = `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${str}`;

  return fetch(customURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// export function fetchMealByName(nome) {
//   const fetchNameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;

//   return fetch(fetchNameURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchMealByFirstLetter(primeiraLetra) {
//   const fetchFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;

//   return fetch(fetchFirstLetter)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// ****************************************

// LIST

export function fetchMealByList(type) {
  const customURL = `https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`;

  return fetch(customURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// export function fetchAreaOptions() {
//   const AreaOptionsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

//   return fetch(AreaOptionsURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchFistMealCats() {
//   const mealCatsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

//   return fetch(mealCatsURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchIngridients() {
//   const fetchURL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

//   return fetch(fetchURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// ****************************************

// LOOKUP

export function fetchMealId(id) {
  const fetchMealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  return fetch(fetchMealURL)
    .then((r) => r.json())
    .then((resolve) => resolve);
}

// DRINK (mudar)

// export function fetchDrinkId(id) {
//   const fetchMealURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

//   return fetch(fetchMealURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }
