export async function fetchMealsAPI() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const mealsJSON = await fetch(url);
  const meals = await mealsJSON.json();
  return meals.meals;
}

export async function fetchFilteredMealsAPI(filterFood) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterFood}`;
  const mealsJSON = await fetch(url);
  const meals = await mealsJSON.json();
  console.log(meals);
  return meals.meals;
}
// construir nova req de api pra filtrar a requisição
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
