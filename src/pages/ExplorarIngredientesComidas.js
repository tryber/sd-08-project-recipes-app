import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExplorarIngredientesComidas() {
  const {
    resposta,
    setResposta,
  } = useContext(MyContext);

  const LIMIT = 12;

  useEffect(async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(endpoint);
    const response = await request.json();
    setResposta(response.meals);
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" explore={ false } />
      {
        resposta.map((item, index) => {
          if (index < LIMIT) {
            return (
              <div data-testid={ `${index}-ingredient-card` }>
                <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` } alt={ item.strIngredient } />
                <p data-testid={ `${index}-card-name` }>{item.strIngredient}</p>
              </div>
            );
          }
          return null;
        })
      }
      <Footer />
    </div>
  );
}

export default ExplorarIngredientesComidas;
