import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DOZE = 12;
function CartaoReceitaComidas({ resultadoApi }) {
  return (
    <>
      { resultadoApi.slice(0, DOZE).map((element, i) => (
        <Link
          to={ `/comidas/${element.idMeal}` }
          key={ element.idMeal }
          className="card-comidas"
        >
          <div
            key={ element.idMeal }
            id={ element.idMeal }
            data-testid={ `${i}-recipe-card` }
          >
            <h1
              data-testid={ `${i}-card-name` }
              className="titulo-card"
            >
              {element.strMeal}
            </h1>
            <img
              alt={ element.strMeal }
              data-testid={ `${i}-card-img` }
              src={ element.strMealThumb }
              className="imagem-card"
            />
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
