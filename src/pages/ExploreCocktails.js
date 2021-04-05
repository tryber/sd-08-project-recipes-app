import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as cocktailApi from '../services/cocktailApi';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import ExploreContainer from '../components/ExploreContainer';

const ExploreCocktails = () => {
  const history = useHistory();

  async function handleRandomCocktail() {
    const { drinks } = await cocktailApi.getRandom();
    const { idDrink } = drinks[0];
    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <Container>
      <Header title="Explorar Bebidas" />
      <ExploreContainer>
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleRandomCocktail }
        >
          Me Surpreenda!
        </button>
      </ExploreContainer>
      <Footer />
    </Container>
  );
};

export default ExploreCocktails;
