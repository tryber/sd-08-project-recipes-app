const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const fetchMeals = (search) => fetch(`${URL}${search}`)
  .then((results) => results.json()
    .then((data) => data));

export default fetchMeals;
