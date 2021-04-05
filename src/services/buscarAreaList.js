export default async function buscarAreaListAPI() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const resultado = await fetch(endpoint);
  const resultadoJson = await resultado.json();
  // const { comidas } = resultadoJson;
  // console.log(resultadoJson);
  // return resultadoJson;
  return resultadoJson.meals;
}
