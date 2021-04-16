import React from 'react';
import { useSelector } from 'react-redux';
import { findKey } from '../services';

const IngredientList = () => {
  const { singleRecipe } = useSelector((state) => state.recipes);
  const ingredient = findKey(singleRecipe[0], 'strIngredient');
  const measure = findKey(singleRecipe[0], 'strMeasure');

  return ingredient.map((nome, index) => (
    <p
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ index }
    >
      {`${nome} - ${measure[index]}`}
    </p>
  ));
};

export default IngredientList;
