import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExplorarIngredientesBebidas() {
  const {
    resposta,
    setResposta,
  } = useContext(MyContext);

  const LIMIT = 12;

  useEffect(async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(endpoint);
    const response = await request.json();
    setResposta(response.drinks);
  }, []);

  console.log(resposta);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {
        resposta.map((item, index) => {
          if (index < LIMIT) {
            return (
              <div data-testid={ `${index}-ingredient-card` }>
                <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` } alt={ item.strIngredient1 } />
                <p data-testid={ `${index}-card-name` }>{item.strIngredient1}</p>
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

export default ExplorarIngredientesBebidas;
