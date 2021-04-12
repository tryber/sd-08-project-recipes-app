import React from 'react';
import Footer from '../components/Footer';
import HeaderPS from '../components/HeaderPS';
import RecipeList from '../components/RecipeList';
import RecipeCategory from '../components/RecipeCategory';

import '../styles/RecipeList.css';

function Comidas() {
  return (
    <>
      <HeaderPS title="Comidas" endpoint="themealdb" />
      <main className="recipe-list-container">
        <RecipeCategory recipeType="meals" endpoint="themealdb" />
        <RecipeList route="comidas" recipeType="Meal" endpoint="themealdb" />
      </main>
      <Footer />
    </>
  );
}

export default Comidas;
