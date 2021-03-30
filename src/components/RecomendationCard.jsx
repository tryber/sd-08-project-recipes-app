import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import alternatePath from '../services/alternatePath';

function RecomendationCard(props) {
  const { index, food } = props;
  const history = useHistory();
  const { pathname } = useLocation();

  function handlePush() {
    history.push(`${alternatePath(pathname)}/${food.idDrink || food.idMeal}`);
  }

  return (
    <>
      <button
        type="button"
        onClick={ () => handlePush() }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ food.strDrinkThumb || food.strMealThumb }
          alt="Food"
          className="carouselImage"
        />
      </button>
      <p
        data-testid={ `${index}-recomendation-title` }
      >
        { food.strDrink || food.strMeal }

      </p>
    </>
  );
}
RecomendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  food: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecomendationCard;
