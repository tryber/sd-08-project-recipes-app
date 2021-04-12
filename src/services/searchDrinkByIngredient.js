const searchByDrinkIngredient = (ingredient) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

export default searchByDrinkIngredient;
