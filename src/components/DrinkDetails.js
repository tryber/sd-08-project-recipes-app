import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MAX_INGREDIENTS_NUMBER = 15;
const UNITARY_INCREMENT = 1;

function DrinkDetails({ drink }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (drink !== undefined) {
      const arrayOfIngredients = [];
      for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += UNITARY_INCREMENT) {
        if (drink[`strIngredient${index}`] !== null
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
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <img src={ drink.strDrinkThumb } alt="drink" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
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
