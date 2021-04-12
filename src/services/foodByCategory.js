const fetchFoodByCategory = (category) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

export default fetchFoodByCategory;
