import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getIngredientsAPI } from '../services/API';

function BebidasIngredientes() {
  const [ing, setIng] = useState([]);
  const [renderIng, setRenderIng] = useState(false);
  const LIMITER = 12;

  useEffect(async () => {
    const ingFromAPI = await getIngredientsAPI('cocktail');
    setIng(ingFromAPI.drinks);
    setRenderIng(true);
  }, []);

  return (
    <section>
      <Header pageTitle="Explorar Ingredientes" />
      <section className="g6-ingredient-card-display">
        { renderIng && ing.map((ingrediente, i) => {
          const { strIngredient1 } = ingrediente;
          const img = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
          return i < LIMITER && (
            <section
              key={ i }
              data-testid={ `${i}-ingredient-card` }
              className="g6-ingredient-card"
            >
              <img
                src={ img }
                data-testid={ `${i}-card-img` }
                alt={ `${strIngredient1}` }
              />
              <h3 data-testid={ `${i}-card-name` }>
                { strIngredient1 }
              </h3>
            </section>
          );
        }) }
      </section>
      <Footer />
    </section>
  );
}

export default BebidasIngredientes;
