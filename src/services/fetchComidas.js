export async function fetchComidasAPI() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const comidasJSON = await fetch(endpoint);
  const comidas = await comidasJSON.json();
  return comidas.meals;
}

export async function resultadoApiComidas(type, search) {
  const endpoint = type === 'i' ? `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${search}` : `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${search}`;
  const results = await fetch(endpoint);
  const resultsJson = await results.json();
  return resultsJson.meals;
}

export async function buscarDetalhesComida(id) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const results = await fetch(endpoint);
  const resultsJson = await results.json();
  return resultsJson.meals[0];
}
