export default async function fetchDrink(searchParam) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/${searchParam}`)
    .then((response) => response.json());
}
//  comentario
