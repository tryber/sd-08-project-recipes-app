import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function DrinksCard(props) {
  const history = useHistory();
  const { index, drink, id } = props;
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <input
        className="card-image"
        type="image"
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt="comida"
        onClick={ () => history.push(`/bebidas/${id}`) }
      />
      <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
    </div>
  );
}

DrinksCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinksCard;
