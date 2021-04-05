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
    <>
      <button type="button" name="mais" onClick={ clickHandle }>PRA CIMA</button>
      { listItem.map((element, index) => (
        index <= tamanhoCarrossel.max && index >= tamanhoCarrossel.min
          ? (
            <div>
              <img
                src={ element.strMealThumb }
                data-testid={ `${index}-recomendation-card` }
                width="50"
                height="50"
                alt={ element.strMeal }
              />
              <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
            </div>
          )
          : (
            <div hidden>
              <img
                src={ element.strMealThumb }
                data-testid={ `${index}-recomendation-card` }
                alt={ element.strMeal }
              />

              <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
            </div>
          )
      )) }
      <button type="button" name="menos" onClick={ clickHandle }>PRA BAIXO</button>

    </>
  );
}

CarrosselComidas.propTypes = {
  listItem: PropTypes.arrayOf.isRequired,
};

export default CarrosselComidas;
