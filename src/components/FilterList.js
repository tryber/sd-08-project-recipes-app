import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/FilterList.module.css';

const FILTER_LIMIT = 5;

function FilterList({ categories, fetchRecipesByCategory }) {
  const [currentFilter, setCurrentFilter] = useState('All');

  const handleChangeFilter = ({ target }) => {
    if (target.innerText !== currentFilter) {
      setCurrentFilter(target.innerText);
      fetchRecipesByCategory(target.innerText);
    } else {
      setCurrentFilter('All');
      fetchRecipesByCategory('All');
    }
  };

  return (
    <section className={ styles.filterContainer }>
      {['All', ...categories.slice(0, FILTER_LIMIT)].map((filter) => (
        <button
          data-testid={ `${filter}-category-filter` }
          className={ styles.filterButton }
          type="button"
          key={ filter }
          value={ filter }
          onClick={ handleChangeFilter }
        >
          {filter}
        </button>))}
    </section>
  );
}

FilterList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchRecipesByCategory: PropTypes.func.isRequired,
};

export default FilterList;
