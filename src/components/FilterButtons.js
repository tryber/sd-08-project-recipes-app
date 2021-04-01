import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilterButtons extends Component {
  render() {
    const { changeFilter } = this.props;
    return (
      <div className="changeFilter">
        <center>
          <button
            type="button"
            onClick={ () => changeFilter('all') }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            onClick={ () => changeFilter('comida') }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            onClick={ () => changeFilter('bebida') }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </center>
      </div>
    );
  }
}

FilterButtons.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
