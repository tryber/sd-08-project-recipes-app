export default async function BuscaComidas(selectEndpoint, setData = '', value = '') {
  let endpoint;
  if (selectEndpoint === 'ingredients') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  } else if (selectEndpoint === 'name') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  } else if (selectEndpoint === 'firstLetter') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  } else if (selectEndpoint === 'categoryList') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else if (selectEndpoint === 'filterCategory') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
  } else if (selectEndpoint === 'foodDetail') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`;
  } else if (selectEndpoint === 'foodOrigin') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  } else if (selectEndpoint === 'filterOrigin') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
  } else if (selectEndpoint === 'ingredientsCategory') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  } else if (selectEndpoint === 'randomFood') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  }

  const response = await fetch(endpoint);
  const responseJson = await response.json();
  setData(responseJson.meals);
}
