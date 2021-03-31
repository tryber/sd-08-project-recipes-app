// export function fetchCocktailByIngredients(ingrediente) {
//   const fetchIngredientsURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

//   return fetch(fetchIngredientsURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchCocktailByName(nome) {
//   const fetchNameURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;

//   return fetch(fetchNameURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchCocktailByFirstLetter(primeiraLetra) {
//   const fetchFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;

//   return fetch(fetchFirstLetter)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchRandomDrinks() {
//   const randomDrinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

//   return fetch(randomDrinkURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchFistDrinkCats() {
//   const drinkCatsURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

//   return fetch(drinkCatsURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchRecipesDrinkCats(filter) {
//   const recipesFilteredURL = filter === '' ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${''}`
//     : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;

//   return fetch(recipesFilteredURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchDrinkIngridients() {
//   const fetchURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

//   return fetch(fetchURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }

// export function fetchDrinkIngridientsFilter(ingredient) {
//   const recipesFilteredURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

//   return fetch(recipesFilteredURL)
//     .then((r) => r.json())
//     .then((resolve) => resolve);
// }
