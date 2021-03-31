import React, { useContext, useEffect } from 'react';
import CategoriasFood from '../components/CategoriasFood';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';

function Comidas() {
  const {
    directRequestFood, isDrinkLoading, cameFromIngredients } = useContext(RecipeContext);

  useEffect(() => {
    if (!cameFromIngredients) {
      directRequestFood();
    }
  }, []);

  return (
    <div className="comidas-body">
      <Header title="Comidas" />
      <div className="recipes-background-color" />
      <CategoriasFood />
      {!isDrinkLoading ? (
        <div>
          {console.log(document.referrer)}
          <RecipesList />
        </div>) : <p>Carregando</p>}
      <Footer />
    </div>
  );
}

export default Comidas;
