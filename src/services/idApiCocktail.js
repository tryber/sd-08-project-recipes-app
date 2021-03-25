export default async function fetchFood(idDrink) {
  return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i={idDrink}')
    .then((response) => response.json());
}
