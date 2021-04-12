const fetchFilterMealByArea = (meal) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal}`);

export default fetchFilterMealByArea;
