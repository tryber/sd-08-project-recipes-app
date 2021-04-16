// import { fetchDrinks, fetchDrinkById } from './drinksAPI';
// import { fetchMeals, fetchMealById } from './mealsAPI';
import fetchDrinkById from './drinkByIdAPI';
import fetchDrinks from './drinksAPI';
import fetchMeals from './mealsAPI';
import fetchMealById from './mealsByIdAPI';
import fetchCategoriesDrink from './drinkCategory';
import fetchCategoriesFood from './foodCategory';
import fetchFoodByCategory from './foodByCategory';
import fetchDrinkByCategory from './drinkByCategory';
import fetchByDrinkFilters from './drinkBySearchFilter';
import fetchByFilters from './fetchByFilter';
import fetchIngredients from './ingredientsAPI';
import fetchDrinkIngredients from './ingredientDrinkAPI';
import searchByDrinkIngredient from './searchDrinkByIngredient';
import searchByFoodIngredient from './searchByMealIngredient';
import fetchAreaList from './listAreas';
import fetchFilterMealByArea from './filterMealByArea';

const api = {
  fetchDrinks,
  fetchDrinkById,
  fetchMeals,
  fetchMealById,
  fetchCategoriesDrink,
  fetchCategoriesFood,
  fetchFoodByCategory,
  fetchDrinkByCategory,
  fetchByDrinkFilters,
  fetchByFilters,
  fetchIngredients,
  fetchDrinkIngredients,
  searchByDrinkIngredient,
  searchByFoodIngredient,
  fetchAreaList,
  fetchFilterMealByArea,
};

export default api;
