import React from 'react';
import PropTypes from 'prop-types';

function CardComida(props) {
  const { comida, id } = props;
  return (
    <section
      data-testid={ `${id}-recipe-card` }
      className="g6-card"
    >
      <h3
        data-testid={ `${id}-card-name` }
      >
        { comida.strMeal }
      </h3>
      <img
        data-testid={ `${id}-card-img` }
        src={ comida.strMealThumb }
        alt={ comida.strMeal }
      />
    </section>
  );
}

CardComida.propTypes = {
  comida: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default CardComida;
