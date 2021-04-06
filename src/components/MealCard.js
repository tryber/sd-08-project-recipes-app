import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MealCard extends Component {
  render() {
    const { meals: { strMealThumb, strMeal, idMeal }, index, testid } = this.props;
    return (
      <div>
        <Link to={ `/comidas/${idMeal}` }>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
            className="recipe-photo"
          />
          <div data-testid={ `${index}-${testid}` }>
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        </Link>
      </div>
    );
  }
}

MealCard.propTypes = {
  meals: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};

export default MealCard;
