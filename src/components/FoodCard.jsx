import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

function FoodCard(props) {
  const { index, food } = props;
  const history = useHistory();
  const { pathname } = useLocation();
  const PATHSIZE = 8;
  const shortPath = pathname.slice(0, PATHSIZE);

  return (
    <button
      type="button"
      onClick={ () => history.push(`${shortPath}/${food.idDrink || food.idMeal}`) }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ food.strDrinkThumb || food.strMealThumb }
        alt="Food"
        width="100%"
      />
      <p data-testid={ `${index}-card-name` }>{ food.strDrink || food.strMeal }</p>
    </button>
  );
}
FoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  food: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodCard;
