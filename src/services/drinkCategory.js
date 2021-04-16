const DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const fetchCategoriesDrink = () => fetch(DRINK_CATEGORIES);

export default fetchCategoriesDrink;
