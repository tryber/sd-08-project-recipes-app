import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buscarIngredientesComidas } from '../services/buscarIngredientes';

function ExplorarIngredientesComidas() {
  const history = useHistory();
  const [ingredientes, setIngredientes] = useState([]);
  const {
    setSearch,
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
    // tituloDaPagina,
  } = useContext(ContextReceitas);
  useEffect(() => {
    async function listaIngredientesAPI() {
      const ingredientesAPI = await buscarIngredientesComidas();
      setIngredientes(ingredientesAPI);
    }
    listaIngredientesAPI();
    enviarTituloDaPagina('Explorar Ingredientes Comidas');
    mudarStatusBotaoPesquisa(false);
  }, []);

  function handleRedireciona({ target: { alt } }) {
    console.log('olá');
    console.log(alt);
    history.push('/comidas');
    setSearch({ type: 'i', search: alt });
  }

  return (
    <div>
      <Header />
      <div>
        {ingredientes.map((element, index) => (

          <Link
            type="button"
            key={ element.strIngredient }
            data-testid={ `${index}-ingredient-card` }
            to="/comidas"
            onClick={ handleRedireciona }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png` }
              alt={ element.strIngredient }
              value={ element.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <div data-testid={ `${index}-card-name` }>{element.strIngredient}</div>
          </Link>

        ))}
        ;
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarIngredientesComidas;
