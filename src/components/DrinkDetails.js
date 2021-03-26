import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MAX_INGREDIENTS_NUMBER, UNITARY_INCREMENT } from '../common/defs';
import ShareButtonDrink from './ShareButtonDrink';
import FavoriteButton from './FavoriteButton';

function DrinkDetails({ drink }) {
  const [ingredients, setIngredients] = useState([]);
  const [drinksState, setDrinkState] = useState({
    drink: [],
    favorite: false,
  });

  useEffect(() => {
    if (drink !== undefined) {
      const arrayOfIngredients = [];
      for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += UNITARY_INCREMENT) {
        if (drink[`strIngredient${index}`] !== null
          && drink[`strIngredient${index}`] !== undefined
          && drink[`strIngredient${index}`] !== '') {
          const ingredientObject = {
            ingredient: drink[`strIngredient${index}`],
            measure: drink[`strMeasure${index}`],
          };
          arrayOfIngredients.push(ingredientObject);
        }
      }
      setIngredients(arrayOfIngredients);
    }
  }, [drink]);

  return (
    <div>
      <img src={ drink.strDrinkThumb } alt="drink" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <br />
      <ShareButtonDrink drink={ drink } />
      <FavoriteButton
        beforeState={ drinksState }
        setFavorite={ setDrinkState }
        recipe={ drink }
        type="bebida"
      />
      <p data-testid="recipe-category">
        {drink.strCategory}
        {'  -  '}
        {drink.strAlcoholic}
      </p>
      {ingredients.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient.ingredient}
          {'  -  '}
          {ingredient.measure}
        </p>
      ))}
      <p data-testid="instructions">{drink.strInstructions}</p>
    </div>
  );
}

DrinkDetails.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default DrinkDetails;
