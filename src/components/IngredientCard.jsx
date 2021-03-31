import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { IngridientFilterAction } from '../redux/actions/fetchMealIngredientThunk';

function IngredientCard({ index, ingredient, recipe }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(IngridientFilterAction(ingredient));
    if (recipe === 'meal') history.push('/comidas');
    if (recipe === 'drink') history.push('/bebidas');
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-ingredient-card` }
      className="card"
      onClick={ handleClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        alt={ ingredient }
        src={ recipe === 'meal' ? `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
          : `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
      />
      <span data-testid={ `${index}-card-name` }>{ingredient}</span>
    </button>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default IngredientCard;
