import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function ExploreFoodOrDrink({ foodOrDrink, idName }) {
  const history = useHistory();

  return (
    <div>
      <Link to={ `/explorar/${foodOrDrink}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      { window.location.pathname !== '/explorar/bebidas'
      && (
        <Link to={ `/explorar/${foodOrDrink}/area` }>
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>)}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/${foodOrDrink}/${idName}`) }
      >
        Me Surpreenda!
      </button>

    </div>
  );
}

ExploreFoodOrDrink.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
  idName: PropTypes.string.isRequired,
};

export default ExploreFoodOrDrink;
