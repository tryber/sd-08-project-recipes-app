const DRINKS_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const fetchDrinks = () => fetch(DRINKS_SEARCH_URL);

export default fetchDrinks;
