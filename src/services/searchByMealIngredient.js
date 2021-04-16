const searchByFoodIngredient = (ingredient) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

export default searchByFoodIngredient;
