import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import './ReceitasProgressCheckbox.css';

function DetailIngredientsProgress(props) {
  const { ingredients, measures, checkboxLocalStorage, checkbox } = props;

  return (
    <section>
      <h1>Ingredientes</h1>
      <Form>
        { ingredients.map((ingredient, index) => (
          <div data-testid={ `${index}-ingredient-step` } key={ index }>
            <Form.Check
              className="checkbox"
              type="checkbox"
              value=""
              defaultChecked={
                checkbox.includes(index)
              }
              onChange={ (e) => {
                if (e.target.checked === true) {
                  checkboxLocalStorage(index, true);
                } else if (e.target.checked === false) {
                  checkboxLocalStorage(index, false);
                }
              } }
              id="flexCheckChecked"
              label={ `${ingredient} - ${measures[index] || ''}` }
            />
          </div>
        ))}
      </Form>
    </section>
  );
}

DetailIngredientsProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  checkboxLocalStorage: PropTypes.func.isRequired,
  checkbox: PropTypes.arrayOf(PropTypes.number),
};

DetailIngredientsProgress.defaultProps = {
  ingredients: [],
  measures: [],
  checkbox: [],
};

export default DetailIngredientsProgress;
