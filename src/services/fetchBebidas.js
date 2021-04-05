export async function fetchBebidasAPI() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const dozeBebidas = 12;
  const bebidasJSON = await fetch(endpoint);
  const bebidas = await bebidasJSON.json();
  return bebidas.drinks.slice(0, dozeBebidas);
}

export async function resultadoApiBebidas(type, search) {
  const endpoint = type === 'i' ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${type}=${search}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${search}`;
  const results = await fetch(endpoint);
  const resultsJson = await results.json();
  return resultsJson.drinks;
}

export async function buscarDetalhesBebidas(id) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const results = await fetch(endpoint);
  const resultsJson = await results.json();
  return resultsJson.drinks[0];
}
