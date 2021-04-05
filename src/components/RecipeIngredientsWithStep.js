import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as storage from '../services/storage';

import styles from '../styles/components/RecipeIngredientsWithStep.module.css';

const RecipeIngredients = ({ ingredients, measures, id, setIsButtonDisabled }) => {
  const form = useRef();
  const [checkedIngredients, setCheckedIngredients] = useState(() => (
    (JSON.parse(storage.getInProgress()) || [])[id] || []
  ));

  function handleChange() {
    const inputs = form.current.querySelectorAll('[type="checkbox"');
    const formatedIngredients = Array.from(inputs)
      .filter((input) => input.checked)
      .map((input) => (input.parentElement.textContent));
    storage.saveInProgressRecipe({ id, ingredients: formatedIngredients });
    setCheckedIngredients(formatedIngredients);
    setIsButtonDisabled(inputs.length !== formatedIngredients.length);
  }

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <div className={ styles.ingredientsContainer }>
      <h2>Ingredients</h2>
      <form
        ref={ form }
        className={ styles.ingredients }
        onChange={ handleChange }
      >
        {ingredients
          .map((ingredient, index) => (
            <label
              htmlFor={ `${index}-ingredient-step` }
              data-testid={ `${index}-ingredient-step` }
              key={ index }
            >
              <input
                id={ `${index}-ingredient-step` }
                type="checkbox"
                checked={ checkedIngredients
                  .includes(`${ingredient}: ${measures[index]}`) }
                onChange={ () => {} }
              />
              { `${ingredient}: ${measures[index]}` }
            </label>
          ))}
      </form>
    </div>
  );
};

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  setIsButtonDisabled: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeIngredients;
