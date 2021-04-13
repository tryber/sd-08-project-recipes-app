import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList({
  ingredients,
  handleCheck,
  checkeds,
  measures,
}) {
  function setClassName(item) {
    if (checkeds !== undefined) {
      if (checkeds[item]) {
        return 'checkbox-ingredient';
      }
      return '';
    }
  }

  function setCheckbox(item) {
    if (checkeds !== undefined) {
      if (checkeds[item]) {
        return true;
      }
      return false;
    }
  }

  return (
    <>
      {ingredients.map((item, index) => (
        <li
          key={ index }
        >
          <label
            htmlFor={ `${item}` }
            className={ setClassName(item) }
          >
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
              id={ `${item}` }
              name={ `${item}` }
              onClick={ (evt) => handleCheck(evt) }
              checked={ setCheckbox(item) }
            />
            {`${item} - ${measures[index]}`}
          </label>
        </li>
      ))}
    </>
  );
}

IngredientsList.propTypes = ({
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCheck: PropTypes.func.isRequired,
  checkeds: PropTypes.objectOf(PropTypes.bool).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
});
