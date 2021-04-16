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
        data-testid={ `${index}-main-ingredient-card-link-image` }
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
        data-testid={ `${index}-main-ingredient-card-link` }
      >
        <p
          data-testid={ `${index}-card-name` }
          className="img-link"
        >
          {strIngredient1}
        </p>
      </Link>
    </div>
  );
}

MainIngredientDrinkCard.propTypes = {
  ingredientsDrinksData: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default MainIngredientDrinkCard;
