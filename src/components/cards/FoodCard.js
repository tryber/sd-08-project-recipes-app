import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

export default function FoodCard({ recipes, order }) {
  const { strMeal, strMealThumb } = recipes;

  return (
    <div
      key={ strMeal }
      data-testid={ `${order}-recipe-card` }
      style={ { width: '50%' } }
    >
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ `${order}-card-img` }
      />
      <p data-testid={ `${order}-card-name` }>{strMeal}</p>
    </div>
  );
}

FoodCard.propTypes = {
  recipes: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  order: PropTypes.number.isRequired,
};
