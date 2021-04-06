import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealsIngredientCard extends Component {
  render() {
    const { ingredient: { idIngredient, strIngredient }, index } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-ingredient-card` }>{ idIngredient }</div>
        <img src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` } alt={ strIngredient } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
      </div>
    );
  }
}

MealsIngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    idIngredient: PropTypes.number.isRequired,
    strIngredient: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealsIngredientCard;
