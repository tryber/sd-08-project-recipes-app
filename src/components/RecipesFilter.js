import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/RecipesFilter.module.css';

const RecipesFilter = ({ setSelectedFilter }) => (
  <div className={ styles.recipesFilter }>
    <button
      data-testid="filter-by-all-btn"
      type="button"
      onClick={ () => setSelectedFilter('All') }
    >
      All
    </button>
    <button
      data-testid="filter-by-food-btn"
      type="button"
      onClick={ () => setSelectedFilter('Food') }
    >
      Food
    </button>
    <button
      data-testid="filter-by-drink-btn"
      type="button"
      onClick={ () => setSelectedFilter('Drinks') }
    >
      Drinks
    </button>
  </div>
);

RecipesFilter.propTypes = {
  setSelectedFilter: PropTypes.func.isRequired,
};

export default RecipesFilter;
