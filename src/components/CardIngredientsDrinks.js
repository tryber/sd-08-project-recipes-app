import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardIngredientsDrinks({ index, name }) {
  const history = useHistory();
  const src = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  const searchRecipes = async () => {
    history.push('/bebidas');
  };
  return (
    <div
      className="recipe-card"
      data-testid={ `${index}-ingredient-card` }
    >
      <button
        type="button"
        onClick={ searchRecipes }
      >
        <img
          alt="Recipe Thumbnail"
          data-testid={ `${index}-card-img` }
          src={ src }
          className="recipe-thumb"
          height="250"
        />
        <h2
          className="recipe-name"
          data-testid={ `${index}-card-name` }
        >
          {name}
        </h2>
      </button>
    </div>
  );
}
CardIngredientsDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
