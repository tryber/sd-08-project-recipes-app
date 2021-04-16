import React from 'react';
import PropTypes from 'prop-types';
import './NavBarDoneRecipe.css';

function NavBarDoneRecipe({ onClickTypeFilter }) {
  return (
    <nav className="recipe-done-nav-btn">
      <button
        className="recipe-done-btn-filter"
        data-testid="filter-by-all-btn"
        type="button"
        value="all"
        onClick={ onClickTypeFilter }
      >
        All
      </button>
      <button
        className="recipe-done-btn-filter"
        data-testid="filter-by-food-btn"
        type="button"
        value="comida"
        onClick={ onClickTypeFilter }
      >
        Food
      </button>
      <button
        className="recipe-done-btn-filter"
        data-testid="filter-by-drink-btn"
        type="button"
        value="bebida"
        onClick={ onClickTypeFilter }
      >
        Drinks
      </button>
    </nav>
  );
}

NavBarDoneRecipe.propTypes = {
  onClickTypeFilter: PropTypes.func.isRequired,
};

export default NavBarDoneRecipe;
