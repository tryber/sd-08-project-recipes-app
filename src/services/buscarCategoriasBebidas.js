export async function buscarCategoriaBebida() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const resultado = await fetch(endpoint);
  const cinco = 5;
  const resultadoJson = await resultado.json();
  return resultadoJson.drinks.slice(0, cinco);
}

export async function buscarBebidasPorCategoria(categoria) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`;
  const resultado = await fetch(endpoint);
  const resultadoJson = await resultado.json();
  return resultadoJson.drinks;
}
