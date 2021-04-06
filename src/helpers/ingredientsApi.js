const URL = 'https://www.themealdb.com/api/json/v1/1/';

const ENDPOINT = {
  listIngredient: 'list.php?i=list',
};

export default async function getIngredients(key, name) {
  const requestResponse = await fetch(`${URL}${ENDPOINT[key]}${name}`)
    .then((response) => response.json());
  return requestResponse;
}
