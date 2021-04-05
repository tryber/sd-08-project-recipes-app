import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients, measures }) => (
  <div className={ styles.ingredientsContainer }>
    <h2>Ingredients</h2>
    <section className={ styles.ingredients }>
      {ingredients
        .map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient}: ${measures[index]}`}
          </p>))}
    </section>
  </div>
);

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecipeIngredients;
