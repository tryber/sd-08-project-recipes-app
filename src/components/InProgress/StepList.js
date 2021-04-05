import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useIsMeal } from '../../services/customHooks';
import { loadFromStorage, saveOnStorage, makeListWithObj } from '../../services/utils';

export default function StepList({ isDone }) {
  const isMeal = useIsMeal();
  const actualRecipe = useSelector((state) => state.detailsReducer.actualRecipe);
  const strIngredient = 'strIngredient';
  const strMeasure = 'strMeasure';
  const arrayIngredients = makeListWithObj(actualRecipe, strIngredient);
  const arrayMeasures = makeListWithObj(actualRecipe, strMeasure);

  let mealCocktail = '';
  let actualId = 0;

  if (isMeal) {
    mealCocktail = 'meals';
    actualId = actualRecipe.idMeal;
  } else {
    mealCocktail = 'cocktails';
    actualId = actualRecipe.idDrink;
  }

  function initialCheck() {
    const inProgressStorage = loadFromStorage('inProgressRecipes');
    if (inProgressStorage === null) {
      return arrayIngredients.map(() => false);
    }
    const includeCurrent = Object.keys(inProgressStorage).includes(mealCocktail);
    if (includeCurrent) {
      const includeId = Object.keys(inProgressStorage[mealCocktail]).includes(actualId);
      if (includeId) {
        return inProgressStorage[mealCocktail][actualId];
      }
    }
    return arrayIngredients.map(() => false);
  }
  const [checked, setChecked] = useState(initialCheck());

  function progressObject(progress) {
    if (progress === null) {
      return {
        [mealCocktail]: {
          [actualId]: checked,
        },
      };
    }
    return {
      ...progress,
      [mealCocktail]: {
        ...progress[mealCocktail],
        [actualId]: checked,
      },
    };
  }

  function refreshStorage() {
    const progress = loadFromStorage('inProgressRecipes');
    saveOnStorage('inProgressRecipes', progressObject(progress));
  }

  useEffect(() => {
    refreshStorage();
    const progress = loadFromStorage('inProgressRecipes');
    const arrayOfIngredients = progress[mealCocktail][actualId];
    isDone(arrayOfIngredients);
  }, [checked]);

  function addProgress(i) {
    const newArray = [...checked];
    newArray[i] = !checked[i];
    setChecked(newArray);
  }

  return (
    <div>
      <h1>Ingredients</h1>
      <ul className="ingredients-list">
        { arrayIngredients.map((e, i) => (
          <label htmlFor={ `liIngredient${i}` } key={ `ReactKey${e}${i}` }>
            <li
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                id={ `liIngredient${i}` }
                type="checkbox"
                onChange={ () => addProgress(i) }
                value={ i }
                checked={ checked[i] }
              />
              -
              {e}
              -
              { arrayMeasures[i] }
            </li>
          </label>
        )) }
      </ul>
    </div>
  );
}

StepList.propTypes = {
  isDone: PropTypes.func.isRequired,
};
