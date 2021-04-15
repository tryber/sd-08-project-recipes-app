import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealsIngredientCard extends Component {
  render() {
    const { ingredient: { strIngredient }, index } = this.props;
    return (
      <div>
        <div
          data-testid={ `${index}-ingredient-card` }
          className="ingredient-card white80"
        >
          <img src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` } alt={ strIngredient } data-testid={ `${index}-card-img` } />
          <p data-testid={ `${index}-card-name` } className="m-0">{ strIngredient }</p>
        </div>
      </div>
    );
  }
}

MealsIngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    strIngredient: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealsIngredientCard;
