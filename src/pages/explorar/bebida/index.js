import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import { getRandomDrink } from '../../../services/API';

function ExplorarBebida() {
  const [drinkId, setDrinkId] = useState([]);

  useEffect(() => {
    getRandomDrink().then(({ drinks: [{ idDrink }] }) => setDrinkId(idDrink));
  }, []);

  return (
    <>
      <Header explore="false">Explorar Bebidas</Header>
      <section>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${drinkId}` }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default ExplorarBebida;
