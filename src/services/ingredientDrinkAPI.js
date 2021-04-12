const DRINK_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const fetchDrinkIngredients = () => fetch(DRINK_INGREDIENT);

export default fetchDrinkIngredients;
