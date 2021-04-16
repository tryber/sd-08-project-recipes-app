import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getIngredientsFinished } from '../services/getLocalStorage';
import { updateInProgressRecipes } from '../services/setLocalStorage';

const IngredientsRecipeDetailsInProgress = ({
  ingredients,
  page,
  id,
  callback,
}) => {
  const [aux, setAux] = useState(true);
  const handleClick = (ingredient) => {
    updateInProgressRecipes(id, page, ingredient);
    setAux(!aux);
  };

  useEffect(() => {
    const finishedIngredients = getIngredientsFinished(page, id);
    if (ingredients.length === finishedIngredients.length) {
      callback();
    }
  }, [aux, callback, id, page, ingredients]);

  const showCheckBox = () => {
    const finishedIngredients = getIngredientsFinished(page, id);
    return ingredients.map((ingredient, index) => {
      if (finishedIngredients.includes(ingredient)) {
        return (
          <section
            data-testid={ `${index}-ingredient-step` }
            htmlFor="igredient-checkbox"
            key={ ingredient }
          >
            <input
              className="form-check-input"
              type="checkbox"
              name="igredient-checkbox"
              id="igredient-checkbox"
              onClick={ () => handleClick(ingredient) }
              defaultChecked
            />
            <span className="form-check-label">{ingredient}</span>
          </section>
        );
      }
      return (
        <section
          data-testid={ `${index}-ingredient-step` }
          key={ ingredient }
          htmlFor="igredient-checkbox"
        >
          <input
            className="form-check-input"
            type="checkbox"
            name="igredient-checkbox"
            id="igredient-checkbox"
            onClick={ () => handleClick(ingredient) }
          />
          {ingredient}
        </section>
      );
    });
  };

  return (
    <section className="ingredients-recipe-inprogress">
      <h3>Ingredientes</h3>
      <div className="form-check">{showCheckBox()}</div>
    </section>
  );
};

IngredientsRecipeDetailsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default IngredientsRecipeDetailsInProgress;
