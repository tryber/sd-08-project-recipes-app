import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class FilterButtons extends Component {
  render() {
    const { changeFilter } = this.props;
    return (
      <div className="d-flex justify-content-around">
        <Button
          className="filter-button"
          type="button"
          onClick={ () => changeFilter('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          className="filter-button"
          type="button"
          onClick={ () => changeFilter('comida') }
          data-testid="filter-by-food-btn"
        >
          Food
        </Button>
        <Button
          className="filter-button"
          type="button"
          onClick={ () => changeFilter('bebida') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </div>
    );
  }
}

FilterButtons.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
