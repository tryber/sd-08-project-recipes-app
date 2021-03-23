import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function MealCard({ meal, index, history }) {
  const { setMeal } = useContext(RecipesContext);
  const { strMeal, strMealThumb, idMeal } = meal;

  const handleClick = () => {
    setMeal(meal);
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ handleClick }
    >
      <img
        src={ strMealThumb }
        alt="meal"
        data-testid={ `${index}-card-img` }
        className="button-item"
      />
      <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
    </button>);
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealCard;
