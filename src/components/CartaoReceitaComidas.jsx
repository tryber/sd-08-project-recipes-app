import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DOZE = 12;
const CINQUENTA = 50;
function CartaoReceitaComidas({ resultadoApi }) {
  return (
    <>
      { resultadoApi.slice(0, DOZE).map((element, i) => (
        <Link to={ `/comidas/${element.idMeal}` } key={ element.idMeal }>
          <div
            key={ element.idMeal }
            id={ element.idMeal }
            data-testid={ `${i}-recipe-card` }
          >
            <img
              width={ `${CINQUENTA}vh` }
              alt={ element.strMeal }
              data-testid={ `${i}-card-img` }
              src={ element.strMealThumb }
            />
            <h1 data-testid={ `${i}-card-name` }>{element.strMeal}</h1>
          </div>
        </Link>
      ))}
    </>
  );
}

CartaoReceitaComidas.propTypes = {
  resultadoApi: PropTypes.arrayOf.isRequired,
};

export default CartaoReceitaComidas;
