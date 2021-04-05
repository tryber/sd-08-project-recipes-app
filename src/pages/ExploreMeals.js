import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as mealApi from '../services/mealApi';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import ExploreContainer from '../components/ExploreContainer';

const ExploreMeals = () => {
  const history = useHistory();

  async function handleRandomMeal() {
    const { meals } = await mealApi.getRandom();
    const { idMeal } = meals[0];
    history.push(`/comidas/${idMeal}`);
  }

  return (
    <Container>
      <Header title="Explorar Comidas" />
      <ExploreContainer>
        <Link
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </Link>
        <Link
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleRandomMeal }
        >
          Me Surpreenda!
        </button>
      </ExploreContainer>
      <Footer />
    </Container>
  );
};

export default ExploreMeals;
