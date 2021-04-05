import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <>
      <button type="button" name="mais" onClick={ clickHandle }>PRA CIMA</button>
      { listItem.map((element, index) => (
        index <= tamanhoCarrossel.max && index >= tamanhoCarrossel.min
          ? (
            <div>
              <img
                src={ element.strDrinkThumb }
                data-testid={ `${index}-recomendation-card` }
                width="50"
                height="50"
                alt={ element.strDrink }
              />
              <p data-testid={ `${index}-recomendation-title` }>{element.strDrink}</p>
            </div>)
          : (
            <div hidden>
              <img
                src={ element.strDrinkThumb }
                data-testid={ `${index}-recomendation-card` }
                alt={ element.strDrink }
              />

              <p data-testid={ `${index}-recomendation-title` }>{element.strDrink}</p>
            </div>
          )
      )) }
      <button type="button" name="menos" onClick={ clickHandle }>PRA BAIXO</button>

    </>
  );
}

CarrosselBebidas.propTypes = {
  listItem: PropTypes.arrayOf.isRequired,
};

export default CarrosselBebidas;
