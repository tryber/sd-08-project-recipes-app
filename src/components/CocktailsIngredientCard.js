import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CocktailsIngredientCard extends Component {
  render() {
    const { ingredient: { strIngredient1 }, index } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-ingredient-card` }>{ index + 1 }</div>
        <img
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          alt={ strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
      </div>
    );
  }
}

CocktailsIngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    strIngredient1: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CocktailsIngredientCard;
