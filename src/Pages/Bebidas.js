import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';
import CategoriasBebidas from '../components/CategoriasBebidas';

function Bebidas() {
  const {
    directRequestDrink, isDrinkLoading, cameFromIngredients } = useContext(RecipeContext);

  useEffect(() => {
    if (!cameFromIngredients) {
      directRequestDrink();
    }
  }, []);
  return (
    <div className="bebidas-body">
      <div className="recipes-background-color" />
      <Header title="Bebidas" />
      <CategoriasBebidas />
      { !isDrinkLoading ? (
        <div>
          <RecipesList />
        </div>) : <p>Carregando</p> }
      <Footer />
    </div>
  );
}

export default Bebidas;
