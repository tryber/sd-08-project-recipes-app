import React from 'react';
import PropTypes from 'prop-types';

function CardBebida(props) {
  const { bebida, id } = props;
  return (
    <section
      data-testid={ `${id}-recipe-card` }
      className="g6-card"
    >
      <h3
        data-testid={ `${id}-card-name` }
      >
        { bebida.strDrink }
      </h3>
      <img
        data-testid={ `${id}-card-img` }
        src={ bebida.strDrinkThumb }
        alt={ bebida.strDrink }
      />
    </section>
  );
}

CardBebida.propTypes = {
  bebida: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default CardBebida;
