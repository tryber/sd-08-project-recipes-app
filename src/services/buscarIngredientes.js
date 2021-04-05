export async function buscarIngredientesBebidas() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const resultado = await fetch(endpoint);
  const doze = 12;
  const resultadoJson = await resultado.json();
  const { drinks } = resultadoJson;
  console.log(drinks);
  return drinks.slice(0, doze);
}

export async function buscarIngredientesComidas() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const resultado = await fetch(endpoint);
  const doze = 12;
  const resultadoJson = await resultado.json();
  const { meals } = resultadoJson;
  console.log(meals);
  return meals.slice(0, doze);
}
