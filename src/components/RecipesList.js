import React, { useContext, useEffect, useState } from 'react';
import {
  requestRecipesList,
  requestRecipesByIngredient,
  requestRecipesByNameOrFirstLetter,
  requestMealsByCategorie,
} from '../services/apiRequests';
import RecipesCard from './RecipesCard';
import Context from '../context/Context';

function RecipesList() {
  const { searchParams, inputValue, setIsLoading } = useContext(Context);
  const [allMeals, setAllMeals] = useState([]);
  const MAX_INDEX = 11;
  useEffect(() => {
    async function requestRecipes(searchFilter, value) {
      setIsLoading(true);
      if (searchFilter === '') {
        const meals = await requestRecipesList();
        setAllMeals(meals);
      } else if (searchFilter === 'ingrediente') {
        const meals = await requestRecipesByIngredient(value);
        setAllMeals(meals);
      } else if (searchFilter === 'primeira-letra') {
        const meals = await requestRecipesByNameOrFirstLetter('f', value);
        setAllMeals(meals);
      } else if (searchFilter === 'categorie') {
        const meals = await requestMealsByCategorie(value);
        setAllMeals(meals);
      } else {
        const meals = await requestRecipesByNameOrFirstLetter('s', value);
        setAllMeals(meals);
      }
      setIsLoading(false);
    }
    requestRecipes(searchParams, inputValue);
  }, [searchParams, inputValue, setIsLoading]);
  return (
    <main className="recipes-container">
      {
        allMeals !== null || undefined
          ? allMeals.map((meal, index) => {
            if (index <= MAX_INDEX) {
              return (
                <RecipesCard
                  key={ meal.idMeal }
                  meal={ meal }
                  index={ index }
                  id={ meal.idMeal }
                />
              );
            }
            return '';
          })
          : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
    </main>
  );
}

export default RecipesList;
