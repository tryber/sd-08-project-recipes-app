const FOOD_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const fetchCategoriesFood = () => fetch(FOOD_CATEGORIES);

export default fetchCategoriesFood;
