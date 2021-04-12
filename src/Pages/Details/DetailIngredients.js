import React from 'react';
import PropTypes from 'prop-types';

function DetailIngredients(props) {
  const { ingredients, measures } = props;
  return (
    <section>
      <h1>Ingredientes</h1>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${measures[index] || ''}`}
          </li>
        ))}
      </ul>
    </section>
  );
}

DetailIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
};

DetailIngredients.defaultProps = {
  ingredients: [],
  measures: [],
};

export default DetailIngredients;
