import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExplorarBebidas({ history }) {
  const fetchSurpriseDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const result = await response.json();
    const id = result.drinks[0].idDrink;
    console.log(result.drinks[0]);
    history.push(`/bebidas/${id}`);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" search={ false } />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <span data-testid="explore-by-ingredient">
            Por Ingredientes
          </span>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => fetchSurpriseDrink() }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExplorarBebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorarBebidas;
