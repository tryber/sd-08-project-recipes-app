import React, { useContext, useEffect } from 'react';
import Category from '../../components/InProgressComponents/Category';
import FavoriteAndShare from '../../components/InProgressComponents/FavoriteAndShare';
import Hero from '../../components/InProgressComponents/Hero';
import IngredientsList from '../../components/InProgressComponents/IngredientsList';
import Instructions from '../../components/InProgressComponents/Instructions';
import Title from '../../components/InProgressComponents/Title';
import RecipesContext from '../../context/RecipesContext';

export default function MealRecipeInProgress() {
  const { meal } = useContext(RecipesContext);

  const { srtMeal, strMealThumb, strCategory, strInstructions } = meal;

  function getIngredients() {
    const ingredients = [];
    for (let index = 1; index <= 20; index = +1) {
      if (meal[`strIngredient${index}`].length > 0) {
        ingredients.push(meal[`strIngredient${index}`]);
      }
    }
    console.log(ingredients);
  }

  useEffect(() => getIngredients(), []);

  return (
    <section>
      {/* <Hero />
      <Title />
      <FavoriteAndShare />
      <Category />
      <IngredientsList />
      <Instructions /> */}
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </section>
  );
}
