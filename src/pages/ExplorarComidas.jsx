import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  const {
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
  } = useContext(ContextReceitas);

  useEffect(() => {
    enviarTituloDaPagina('Explorar Comidas');
    mudarStatusBotaoPesquisa(false);
  }, []);
  const max = 53047;
  const min = 52780;
  const surpresa = Math.round(Math.random() * (max - min + 1) + min);

  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${surpresa}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
