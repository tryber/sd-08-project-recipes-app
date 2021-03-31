import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExplorarComidas({ history }) {
  const fetchSurpriseMeal = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const result = await response.json();
    const id = result.meals[0].idMeal;
    history.push(`/comidas/${id}`);
  };

  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <span data-testid="explore-by-ingredient">
            Por Ingredientes
          </span>
        </Link>
        <Link to="/explorar/comidas/area">
          <span data-testid="explore-by-area">
            Por Local de Origem
          </span>
        </Link>
        <button
          type="button"
          onClick={ () => fetchSurpriseMeal() }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorarComidas;
