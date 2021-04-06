import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DOZE = 12;
function CartaoReceitaBebidas({ resultadoApi }) {
  return (
    <>
      {resultadoApi.slice(0, DOZE).map((element, i) => (
        <Link
          to={ `/bebidas/${element.idDrink}` }
          key={ element.idDrink }
          className="card-comidas"
        >
          <div
            key={ i }
            id={ element.idDrink }
            data-testid={ `${i}-recipe-card` }
          >
            <h1
              data-testid={ `${i}-card-name` }
              className="titulo-card"
            >
              {element.strDrink}
            </h1>
            <img
              src={ element.strDrinkThumb }
              data-testid={ `${i}-card-img` }
              alt={ element.strDrink }
              className="imagem-card"
            />
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
