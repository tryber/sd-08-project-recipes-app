import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CarrosselComidas({ listItem }) {
  const [tamanhoCarrossel, setTamanhoCarrossel] = useState({
    max: 1,
    min: 0,
  });
  function clickHandle({ target: { name } }) {
    return name === 'mais' ? setTamanhoCarrossel((state) => ({
      max: state.max + 1,
      min: state.min + 1,
    })) : setTamanhoCarrossel((state) => ({
      max: state.max - 1,
      min: state.min - 1,
    }));
  }
  return (
    <div className="div-corrossel">
      <button
        type="button"
        name="mais"
        onClick={ clickHandle }
        className="btn-carrossel"
      >
        {'<'}
      </button>
      { listItem.map((element, index) => (
        index <= tamanhoCarrossel.max && index >= tamanhoCarrossel.min
          ? (
            <div className="card-comidas">
              <img
                src={ element.strMealThumb }
                data-testid={ `${index}-recomendation-card` }
                width="50"
                height="50"
                alt={ element.strMeal }
                className="imagem-card"
              />
              <p
                data-testid={ `${index}-recomendation-title` }
                className="titulo-card"
              >
                {element.strMeal}
              </p>
            </div>
          )
          : (
            <div hidden className="card-comidas">
              <img
                src={ element.strMealThumb }
                data-testid={ `${index}-recomendation-card` }
                alt={ element.strMeal }
                className="imagem-card"
              />

              <p
                data-testid={ `${index}-recomendation-title` }
                className="titulo-card"
              >
                {element.strMeal}
              </p>
            </div>
          )
      )) }
      <button
        type="button"
        name="menos"
        onClick={ clickHandle }
        className="btn-carrossel"
      >
        {'>'}
      </button>

    </div>
  );
}

CarrosselComidas.propTypes = {
  listItem: PropTypes.arrayOf.isRequired,
};

export default CarrosselComidas;
