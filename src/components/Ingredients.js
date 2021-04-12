import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import '../styles/Ingredients.css';

function Ingredients({ page, id }) {
  const { recipeDetails, setDisableButton } = useContext(Context);

  const details = Object.values(recipeDetails[0])[0];
  const recipe = Object.values(recipeDetails[0])[0][0];

  useEffect(() => {
    const loadChecks = JSON.parse(localStorage.getItem('usedIngredients')) || {};
    // if (id === loadChecks[loadChecks.length - 1]) {
    const checks = [...document.getElementsByClassName('checkbox')];
    checks.map((item, index) => {
      if (loadChecks[index] === true) {
        item.setAttribute('checked', true);
      }
      // item.checked = loadChecks[index];
      return item;
    });
    // }
  }, []);

  function saveChecks() {
    const checks = [...document.getElementsByClassName('checkbox')];
    const saveCheck = checks.map((item) => item.checked);
    saveCheck.push(id);
    console.log(saveCheck);
    localStorage.setItem('usedIngredients', JSON.stringify(saveCheck));
    // https://www.sitepoint.com/quick-tip-persist-checkbox-checked-state-after-page-reload/

    if (checks.every((item) => item.checked === true)) {
      setDisableButton(false);
    }
  }

  return (
    <section>
      <h5>Ingredients</h5>
      {
        page !== 'details' ? (
          <fieldset id="fieldset">
            {
              Object.keys(details[0]).map((item, index) => (
                recipe[`strIngredient${index + 1}`] !== ''
              && recipe[`strIngredient${index + 1}`]
                  ? (
                    <div data-testid={ `${index}-ingredient-step` } key={ index }>
                      <input
                        type="checkbox"
                        key={ index }
                        id={ index }
                        className="checkbox"
                        onChange={ saveChecks }
                        required
                      />
                      <label htmlFor={ index }>
                        { `${recipe[`strIngredient${index + 1}`]} - 
                        ${recipe[`strMeasure${index + 1}`]}` }
                      </label>
                    </div>
                  )
                  : null
              ))
            }
          </fieldset>
        ) : (
          <ul>
            {
              Object.keys(details[0]).map((item, index) => (
                recipe[`strIngredient${index + 1}`] !== ''
              && recipe[`strIngredient${index + 1}`]
                  ? (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${recipe[`strIngredient${index + 1}`]} - 
                    ${recipe[`strMeasure${index + 1}`]}` }
                    </li>
                  )
                  : null
              ))
            }
          </ul>
        )
      }
      <h5>Instructions</h5>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>

    </section>
  );
}

Ingredients.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Ingredients;
