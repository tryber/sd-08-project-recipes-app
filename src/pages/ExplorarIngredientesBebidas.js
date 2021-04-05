import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buscarIngredientesBebidas } from '../services/buscarIngredientes';

function ExplorarIngredientesBebidas() {
  const history = useHistory();
  const [ingredientes, setIngredientes] = useState([]);
  const {
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
    // tituloDaPagina,
    setSearch,
    setShowDefault,
  } = useContext(ContextReceitas);
  useEffect(() => {
    async function listaIngredientesAPI() {
      const ingredientesAPI = await buscarIngredientesBebidas();
      setIngredientes(ingredientesAPI);
    }
    listaIngredientesAPI();
    enviarTituloDaPagina('Explorar Ingredientes Bebidas');
    mudarStatusBotaoPesquisa(false);
  }, []);

  function handleRedireciona({ target: { alt } }) {
    console.log('olá');
    console.log(alt);
    history.push('/bebidas');
    setSearch({ type: 'i', search: alt });
    setShowDefault(false);
  }

  return (
    <div>
      <Header />
      <div>
        {ingredientes.map((element, index) => (

          <Link
            type="button"
            key={ element.strIngredient1 }
            data-testid={ `${index}-ingredient-card` }
            to="/bebidas"
            onClick={ handleRedireciona }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png` }
              alt={ element.strIngredient1 }
              value={ element.strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <div data-testid={ `${index}-card-name` }>{element.strIngredient1}</div>
          </Link>
        ))}
        ;
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarIngredientesBebidas;
