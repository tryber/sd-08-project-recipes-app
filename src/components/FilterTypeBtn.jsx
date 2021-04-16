import React from 'react';
import PropTypes from 'prop-types';

export default function FilterTypeBtn({ handleSelector }) {
  return (
    <div className="filter-type-btn-section">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ (e) => handleSelector(e) }
        className="regular-button"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ (e) => handleSelector(e) }
        className="regular-button"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drinks"
        onClick={ (e) => handleSelector(e) }
        className="regular-button"
      >
        Drinks
      </button>
    </div>
  );
}

FilterTypeBtn.propTypes = {
  handleSelector: PropTypes.func.isRequired,
};
