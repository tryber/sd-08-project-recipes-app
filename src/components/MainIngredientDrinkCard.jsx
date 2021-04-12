import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../core/RecipesContext';

function MainIngredientDrinkCard({ ingredientsDrinksData, index }) {
  const {
    setByIngredient,
    setIngredientName,
  } = useContext(RecipesContext);
  const { strIngredient1 } = ingredientsDrinksData;
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      className="MainCard"
    >
      <Link
        onClick={ () => {
          setByIngredient(true);
          setIngredientName(strIngredient1);
        } }
        to="/bebidas/"
      >
        <img
          data-testid={ `${index}-card-img` }
          className="img"
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png ` }
          alt={ strIngredient1 }
        />
      </Link>
      <Link
        to="/bebidas/"
        onClick={ () => {
          setByIngredient(true);
          setIngredientName(strIngredient1);
        } }
      >
        <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
      </Link>
    </div>
  );
}

MainIngredientDrinkCard.propTypes = {
  ingredientsDrinksData: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default MainIngredientDrinkCard;
