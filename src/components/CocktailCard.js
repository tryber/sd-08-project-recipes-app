import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CocktailCard({ recipes, order }) {
  const { idDrink, strDrink, strDrinkThumb } = recipes;

  return (
    <Link to={ `bebidas/${idDrink}` }>
      <div key={ strDrink } data-testid={ `${order}-recipe-card` }>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${order}-card-img` }
        />
        <p data-testid={ `${order}-card-name` }>{strDrink}</p>
      </div>
    </Link>
  );
}
CocktailCard.propTypes = {
  recipes: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  order: PropTypes.number.isRequired,
};
