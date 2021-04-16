import React from 'react';
import PropTypes from 'prop-types';

const IngredientsRecipeDetails = ({ ingredients }) => (
  <section className="ingredients-recipe-details">
    <h3>Ingredientes</h3>
    <ul className="list-group">
      {ingredients.map((ingredient, index) => (
        <li
          className="list-group-item"
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {ingredient}
        </li>
      ))}
    </ul>
  </section>
);

IngredientsRecipeDetails.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default IngredientsRecipeDetails;
