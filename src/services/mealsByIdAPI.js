const MEAL_BY_ID_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const fetchMealById = (id) => fetch(MEAL_BY_ID_URL + id);

export default fetchMealById;
