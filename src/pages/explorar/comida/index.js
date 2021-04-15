import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../components/Header';
import Footer from '../../../components/footer';

import { getRandomFood } from '../../../services/API';

function ExplorarComida() {
  const [idFood, setIdFood] = useState();

  useEffect(() => {
    getRandomFood().then(({ meals: [{ idMeal }] }) => setIdFood(idMeal));
  }, []);
  return (
    <>
      <Header explore="false">Explorar Comidas</Header>
      <section className="explore-container">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="page-buttons"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area" className="page-buttons">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${idFood}` }>
          <button type="button" data-testid="explore-surprise" className="page-buttons">
            Me Surpreenda!
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default ExplorarComida;
