import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealCard({ index, meal }) {
  const { strMeal, strMealThumb, idMeal } = meal;

  return (
    <Link
      to={ `/comidas/${idMeal}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ strMealThumb }
        alt="meal"
        data-testid={ `${index}-card-img` }
        className="button-item"
      />
      <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
    </Link>);
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealCard;
