import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FoodCard({ recipes, order }) {
  const { strMeal, idMeal, strMealThumb } = recipes;

  return (
    <Link to={ `comidas/${idMeal} ` }>
      <div key={ strMeal } data-testid={ `${order}-recipe-card` }>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${order}-card-img` }
        />
        <p data-testid={ `${order}-card-name` }>{strMeal}</p>
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  recipes: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  order: PropTypes.number.isRequired,
};
