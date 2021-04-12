import React from 'react';
import Footer from '../components/Footer';
import HeaderPS from '../components/HeaderPS';
import RecipeList from '../components/RecipeList';
import RecipeCategory from '../components/RecipeCategory';

import '../styles/RecipeList.css';

function Bebidas() {
  return (
    <>
      <HeaderPS title="Bebidas" endpoint="thecocktaildb" />
      <main className="recipe-list-container">
        <RecipeCategory recipeType="drinks" endpoint="thecocktaildb" />
        <RecipeList route="bebidas" recipeType="Drink" endpoint="thecocktaildb" />
        <Footer />
      </main>
    </>
  );
}

export default Bebidas;
