import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';

function Card({ data }) {
  const { meal, index } = data;
  const { strMealThumb, strMeal } = meal;
  return (
    <section data-testid={ `${index}-recomendation-card` } className="card">
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h3 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h3>
    </section>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    meal: PropTypes.shape({
      strMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
