import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  const {
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
  } = useContext(ContextReceitas);

  useEffect(() => {
    enviarTituloDaPagina('Explorar Bebidas');
    mudarStatusBotaoPesquisa(false);
  }, []);

  const max = 11618;
  const min = 11000;
  const surpresa = Math.round(Math.random() * (max - min) + min);

  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${surpresa}` }>
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

export default ExplorarBebidas;
