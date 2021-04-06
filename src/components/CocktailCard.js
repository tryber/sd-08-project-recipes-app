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
      <Link to={ `/bebidas/${idDrink}` }>
        <div data-testid={ `${index}-${testid}` }>{ idDrink }</div>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
          className="recipe-photo"
        />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </Link>
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
