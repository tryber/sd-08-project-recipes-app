import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MAX_INGREDIENTS_NUMBER = 20;
const UNITARY_INCREMENT = 1;

function MealDetails({ meal }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (meal !== undefined) {
      const arrayOfIngredients = [];
      for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += UNITARY_INCREMENT) {
        if (meal[`strIngredient${index}`] !== '') {
          const ingredientObject = {
            ingredient: meal[`strIngredient${index}`],
            measure: meal[`strMeasure${index}`],
          };
          arrayOfIngredients.push(ingredientObject);
        }
      }
      setIngredients(arrayOfIngredients);
    }
  }, [meal]);

  function getEmbedId() {
    if (meal.idMeal !== undefined) {
      const url = meal.strYoutube;
      const embedId = url.split('=')[1];
      return embedId;
    }
    return null;
  }

  if (meal === undefined) {
    return null;
  }
  return (
    <div>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <img src={ meal.strMealThumb } alt="meal" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">{meal.strCategory}</p>
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
      <p data-testid="instructions">{meal.strInstructions}</p>
      <iframe src={ `https://www.youtube.com/embed/${getEmbedId()}` } title="Recipe Video" data-testid="video" />
    </div>
  );
}

MealDetails.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string,
    strYoutube: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default MealDetails;
