export async function requestRecipesList() {
  const response = await ((await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json());
  const { meals } = response;
  return meals;
}

export async function requestRecipesByIngredient(ingredient) {
  const response = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json());
  const { meals } = response;
  return meals;
}

export async function requestRecipesByNameOrFirstLetter(type, value) {
  const response = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${type}=${value}`)).json());
  const { meals } = response;
  return meals;
}

export async function requestDrinksList() {
  const response = await ((await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json());
  const { drinks } = response;
  return drinks;
}

export async function requestRadomDrinks() {
  const response = await ((await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')).json());
  const { drinks } = response;
  return drinks;
}

export async function requestRadomRecipe() {
  const response = await ((await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json());
  const { meals } = response;
  return meals;
}

export async function requestMealRecipe(id) {
  const response = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json());
  const { meals } = response;
  return meals;
}

export async function requestDrinksIngredientsList() {
  const response = await ((await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')).json());
  const { drinks } = response;
  return drinks;
}

export async function requestDrinkRecipe(id) {
  const response = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json());
  const { drinks } = response;
  return drinks;
}

export async function requestMealsIngredientsList() {
  const response = await ((await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')).json());
  const { meals } = response;
  return meals;
}

export async function requestDrinksByIngredient(ingredient) {
  const response = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json());
  const { drinks } = response;
  return drinks;
}

export async function requestDrinksByNameOrFirstLetter(type, value) {
  const response = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${value}`)).json());
  const { drinks } = response;
  return drinks;
}

export async function requestAreaList() {
  const response = await ((await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')).json());
  const { meals } = response;
  return meals;
}

export async function requestMealsByAreaList(area) {
  const response = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)).json());
  const { meals } = response;
  return meals;
}

export async function requestMealsCategoriesList() {
  const response = await ((await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json());
  const { meals } = response;
  return meals;
}

export async function requestMealsByCategorie(categorie) {
  const response = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)).json());
  const { meals } = response;
  return meals;
}

export async function requestDrinksCategoriesList() {
  const response = await ((await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')).json());
  const { drinks } = response;
  return drinks;
}
export async function requestDrinksByCategorie(categorie) {
  const response = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`)).json());
  const { drinks } = response;
  return drinks;
}
