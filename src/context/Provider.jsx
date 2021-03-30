import React, { useState, useEffect } from 'react';
import contextRecipes from './Context';
import App from '../App';
import fetchCategories from '../api/fetchCategories';

function RecipesProvider() {
  const [filter, setFilter] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [currentFood, setCurrentFood] = useState({});
  const [currentFoodIngredients, setCurrentFoodIngredients] = useState([]);
  const [mainIngredient, setMain] = useState('');

  useEffect(() => {
    async function fetchData() {
      const drinksCategoriesAPI = await fetchCategories('drinks');
      const mealCategoriesAPI = await fetchCategories('meals');
      setDrinksCategories(drinksCategoriesAPI);
      setMealsCategories(mealCategoriesAPI);
    }
    fetchData();
  }, []);

  const state = {
    setCurrentFoodIngredients,
    currentFoodIngredients,
    setCurrentFood,
    currentFood,
    setMealsCategories,
    setFilter,
    mealsCategories,
    drinksCategories,
    filter,
    mainIngredient,
    setMain,
  };
  return (
    <contextRecipes.Provider value={ state }>
      <App />
    </contextRecipes.Provider>
  );
}

export default RecipesProvider;
