export default async function buscarMealsAreaAPI(areaSelected) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSelected}`;
  const resultado = await fetch(endpoint);
  const doze = 12;
  const resultadoJson = await resultado.json();
  return resultadoJson.meals.slice(0, doze);
}
