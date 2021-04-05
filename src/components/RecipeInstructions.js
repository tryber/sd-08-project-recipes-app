import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/RecipeInstructions.module.css';

const RecipeInstructions = ({ instructions }) => (
  <div className={ styles.instructionsContainer }>
    <h2>Instructions</h2>
    <div className={ styles.instructions }>
      <p data-testid="instructions">
        { instructions }
      </p>
    </div>
  </div>
);

RecipeInstructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default RecipeInstructions;
