const INGREDIENTS_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

const fetchIngredients = () => fetch(INGREDIENTS_LIST);

export default fetchIngredients;
