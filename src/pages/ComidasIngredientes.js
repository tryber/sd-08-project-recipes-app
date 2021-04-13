import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getIngredientsAPI } from '../services/API';

function ComidasIngredientes() {
  const [ing, setIng] = useState([]);
  const [renderIng, setRenderIng] = useState(false);
  const LIMITER = 12;

  useEffect(async () => {
    const ingFromAPI = await getIngredientsAPI('meal');
    setIng(ingFromAPI.meals);
    setRenderIng(true);
  }, []);

  return (
    <section>
      <Header pageTitle="Explorar Ingredientes" />
      <section className="g6-ingredient-card-display">
        { renderIng && ing.map((ingrediente, i) => {
          const { strIngredient } = ingrediente;
          const img = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
          return i < LIMITER && (
            <section
              key={ i }
              data-testid={ `${i}-ingredient-card` }
              className="g6-ingredient-card"
            >
              <img
                src={ img }
                data-testid={ `${i}-card-img` }
                alt={ `${strIngredient}` }
              />
              <h3 data-testid={ `${i}-card-name` }>
                { strIngredient }
              </h3>
            </section>
          );
        }) }
      </section>
      <Footer />
    </section>
  );
}

export default ComidasIngredientes;
