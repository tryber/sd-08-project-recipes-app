import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Card.css';

function Card({ index, card }) {
  const history = useHistory();

  const renderDrink = () => {
    const { strDrink, strDrinkThumb, idDrink } = card;
    return (
      <Link to={ `/bebidas/${idDrink}` }>
        <div className="card">
          <h1 className="food-title" data-testid={ `${index}-card-name` }>{strDrink}</h1>
          <img
            className="food-image"
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ strDrink }
          />
        </div>
      </Link>
    );
  };

  const renderFood = () => {
    const { strMeal, strMealThumb, idMeal } = card;
    return (
      <Link to={ `/comidas/${idMeal}` }>
        <div className="card">
          <h1 className="food-title" data-testid={ `${index}-card-name` }>{strMeal}</h1>
          <img
            className="food-image"
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
          />
        </div>
      </Link>
    );
  };

  const render = () => {
    const value = history.location.pathname;
    if (value.includes('comidas')) {
      return renderFood();
    }
    if (value.includes('bebidas')) {
      return renderDrink();
    }
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {render()}
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  card: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default Card;
