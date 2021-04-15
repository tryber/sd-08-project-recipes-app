import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CocktailCard extends Component {
  render() {
    const { cocktail: {
      strDrinkThumb,
      strDrink,
      idDrink }, index, testid } = this.props;
    return (
      <div className="container widthM350 mt-2 white70">
        <Link to={ `/bebidas/${idDrink}` }>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
            className="recipe-photo img-fluid pt-3"
          />
          <div data-testid={ `${index}-${testid}` }>
            <p
              data-testid={ `${index}-card-name` }
              className="text-center font-mountains mt-1 h4 text-danger"
            >
              { strDrink }
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

CocktailCard.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.number.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};

export default CocktailCard;
