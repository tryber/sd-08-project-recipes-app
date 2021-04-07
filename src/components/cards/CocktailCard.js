import React from 'react';
import PropTypes from 'prop-types';

export default function CocktailCard({ recipes, order }) {
  const { strDrink, strDrinkThumb } = recipes;
  return (
    <div
      key={ strDrink }
      data-testid={ `${order}-recipe-card` }
      style={ { width: '50%' } }
    >
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ `${order}-card-img` }
      />
      <p data-testid={ `${order}-card-name` }>{strDrink}</p>
    </div>
  );
}

CocktailCard.propTypes = {
  recipes: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  order: PropTypes.number.isRequired,
};
