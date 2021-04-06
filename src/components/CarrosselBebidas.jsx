import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/detalhesReceitas.css';

function CarrosselBebidas({ listItem }) {
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
              <p
                data-testid={ `${index}-recomendation-title` }
                className="titulo-card"
              >
                {element.strDrink}
              </p>
              <img
                src={ element.strDrinkThumb }
                data-testid={ `${index}-recomendation-card` }
                width="50"
                height="50"
                alt={ element.strDrink }
                className="imagem-card"
              />
            </div>)
          : (
            <div hidden className="card-comidas">
              <p
                data-testid={ `${index}-recomendation-title` }
                className="titulo-card"
              >
                {element.strDrink}
              </p>
              <img
                src={ element.strDrinkThumb }
                data-testid={ `${index}-recomendation-card` }
                alt={ element.strDrink }
                className="imagem-card"
              />

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

CarrosselBebidas.propTypes = {
  listItem: PropTypes.arrayOf.isRequired,
};

export default CarrosselBebidas;
