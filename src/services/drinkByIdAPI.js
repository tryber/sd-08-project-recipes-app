const DRINK_ID_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const fetchDrinkById = (id) => fetch(DRINK_ID_URL + id);

export default fetchDrinkById;
