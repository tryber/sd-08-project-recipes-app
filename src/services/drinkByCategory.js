const fetchDrinkByCategory = (category) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

export default fetchDrinkByCategory;
