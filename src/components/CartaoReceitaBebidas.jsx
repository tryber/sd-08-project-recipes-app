import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DOZE = 12;
const CINQUENTA = 50;
function CartaoReceitaBebidas({ resultadoApi }) {
  return (
    <>
      {resultadoApi.slice(0, DOZE).map((element, i) => (
        <Link to={ `/bebidas/${element.idDrink}` } key={ element.idDrink }>
          <div
            key={ i }
            id={ element.idDrink }
            data-testid={ `${i}-recipe-card` }
          >
            <img
              width={ `${CINQUENTA}vh` }
              src={ element.strDrinkThumb }
              data-testid={ `${i}-card-img` }
              alt={ element.strDrink }
            />
            <h1 data-testid={ `${i}-card-name` }>{element.strDrink}</h1>
          </div>
        </Link>

      ))}
    </>
  );
}
CartaoReceitaBebidas.propTypes = {
  resultadoApi: PropTypes.arrayOf.isRequired,
};

export default CartaoReceitaBebidas;
