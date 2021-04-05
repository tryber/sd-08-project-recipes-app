import React from 'react';
import { useSelector } from 'react-redux';
import { makeListWithObj } from '../../services/utils';

function renderList(objParam) {
  const strIngredient = 'strIngredient';
  const strMeasure = 'strMeasure';
  const arrayIngredients = makeListWithObj(objParam, strIngredient);
  const arrayMeasures = makeListWithObj(objParam, strMeasure);
  return (
    <div>
      <h1>Ingredients</h1>
      <ul className="ingredients-list">
        { arrayIngredients.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ `ReactKey${e}${i}` }
          >
            -
            {e}
            -
            { arrayMeasures[i] }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default function IngredientsList() {
  const actualRecipe = useSelector((state) => state.detailsReducer.actualRecipe);
  return (
    <div>
      { renderList(actualRecipe) }
    </div>
  );
}
