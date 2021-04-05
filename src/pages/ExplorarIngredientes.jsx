import React, { useState, useContext, useEffect } from 'react';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buscarIngredientesComidas } from '../services/buscarIngredientes';

function ExplorarIngredientes() {
  const [ingredientes, setIngredientes] = useState([]);
  const { enviarTituloDaPagina, mudarStatusBotaoPesquisa } = useContext(
    ContextReceitas,
  );
  useEffect(() => {
    async function listaIngredientesAPI() {
      const ingredientesAPI = await buscarIngredientesComidas();
      setIngredientes(ingredientesAPI);
    }
    listaIngredientesAPI();
    enviarTituloDaPagina('Explorar Ingredientes');
    mudarStatusBotaoPesquisa(false);
  }, []);

  return (
    <div>
      <Header />
      <div>
        {
          ingredientes.map((element, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.'themealdb'.com/images/ingredients/${element.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt="imagem ingrediente"
              />
              <div data-testid={ `${index}-card-name` } />
            </button>
          ))
        }

        {/* ///explorar/comidas/ingredientes */}
        {/* {
          ingredientes.map(({ strIngredient1 }, index) => (
            <button
              type="button"
              key={ strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
                data-testid={ `${index}-card-img` }
              />
              <div data-testid={ `${index}-card-name` }>
                { strIngredient1 }
              </div>
            </button>
          ))
        } */}
        ;
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarIngredientes;
