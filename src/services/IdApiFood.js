export default async function fetchFood(idMeal) {
  return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}')
    .then((response) => response.json());
}
