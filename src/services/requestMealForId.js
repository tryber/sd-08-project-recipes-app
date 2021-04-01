export default async function getMeal(id) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const meals = await data.json();
  const meal = await meals.meals;
  const mealObject = meal[0];
  return mealObject;
}
