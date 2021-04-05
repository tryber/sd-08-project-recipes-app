import React from 'react';
import PropTypes from 'prop-types';

function FilterButton({ filter, setFilterBy }) {
  const filterType = {
    all: '',
    drink: 'bebida',
    food: 'comida',
  };

  function firstToUpperCase(string) {
    const firstLetter = string.slice(0, 1).toUpperCase();
    const stringWithoutFirstLetter = string.slice(1);
    return firstLetter + stringWithoutFirstLetter;
  }

  const dataTestid = `filter-by-${filter}-btn`;
  return (
    <button
      className="filter"
      type="button"
      data-testid={ dataTestid }
      onClick={ () => setFilterBy(filterType[filter]) }
    >
      { firstToUpperCase(filter) }
    </button>
  );
}

FilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilterBy: PropTypes.func.isRequired,
};

export default FilterButton;
