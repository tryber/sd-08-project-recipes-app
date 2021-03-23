import React from 'react';
import Category from '../../components/InProgressComponents/Category';
import FavoriteAndShare from '../../components/InProgressComponents/FavoriteAndShare';
import Hero from '../../components/InProgressComponents/Hero';
import IngredientsList from '../../components/InProgressComponents/IngredientsList';
import Instructions from '../../components/InProgressComponents/Instructions';
import Title from '../../components/InProgressComponents/Title';

export default function CocktailRecipeInProgress() {
  return (
    <section>
      <Hero />
      <Title />
      <FavoriteAndShare />
      <Category />
      <IngredientsList />
      <Instructions />
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </section>
  );
}
