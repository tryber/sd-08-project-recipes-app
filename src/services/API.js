export async function SearchMealByIngredient(ingredient) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await request.json();
  return json;
}

export async function SearchMealByName(name) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await request.json();
  return json;
}

export async function SearchMealByFirstLetter(firstLetter) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const json = await request.json();
  return json;
}

export async function requestMealRecipe() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await request.json();
  return json;
}

export async function SearchCocktailByIngredient(ingredient) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await request.json();
  return json;
}

export async function SearchCocktailByName(name) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await request.json();
  return json;
}

export async function SearchCocktailByFirstLetter(firstLetter) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const json = await request.json();
  return json;
}

export async function requestDrinkRecipe() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const json = await request.json();
  return json;
}

export async function requestDrinkId(id) {
  const results = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return results;
}

export async function requestFoodId(id) {
  const results = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return results;
}

export async function requestIngredientsDrinks() {
  const results = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')).json();
  return results;
}

export async function requestIngredientsMeal() {
  const results = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')).json();
  return results;
}

export async function requestFoodCategory() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const json = await request.json();
  return json;
}

export async function requestDrinksCategory() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const json = await request.json();
  return json;
}

export async function requestDrinksByCategory(category) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await request.json();
  return json;
}

export async function requestMealsByCategory(category) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await request.json();
  return json;
}

export async function getRandomDrink() {
  const drink = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')).json();
  return drink;
}

export async function getRandomFood() {
  const food = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json();
  return food;
}

export async function getListAllAreaOfTheFood() {
  const listAreaFood = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')).json();
  return listAreaFood;
}

export async function getFoodByArea(area) {
  const foodArea = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)).json();
  return foodArea;
}
