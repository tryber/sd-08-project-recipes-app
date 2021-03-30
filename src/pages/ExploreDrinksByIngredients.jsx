import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { requestIngredientsDrinks } from '../services/requestDrinksAPI';
import { infinity } from '../common/svgStore';
import IngredientCard from '../components/IngredientCard';

function ExploreDrinksByIngredients() {
  const [isLoading, setIsLoading] = useState(true);
  const [drinksIngredientsList, setDrinksIngredientsList] = useState([]);

  useEffect(() => {
    async function setIngredientsList() {
      setIsLoading(true);
      const ingredientsList = await requestIngredientsDrinks();
      setDrinksIngredientsList(ingredientsList);
      setIsLoading(false);
    }
    setIngredientsList();
  }, []);

  return (
    <>
      <Header label="Explorar Ingredientes" Search={ () => '' } />
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        drinksIngredientsList.map((ingredient, index) => (
          <IngredientCard
            key={ index }
            imagePath={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            title={ ingredient.strIngredient1 }
            index={ index }
            page="bebidas"
          />
        ))
      )}
      <Footer />
    </>
  );
}

export default ExploreDrinksByIngredients;
