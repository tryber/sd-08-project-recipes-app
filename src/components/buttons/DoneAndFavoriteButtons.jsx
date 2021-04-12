import React from 'react';
import PropTypes from 'prop-types';
import { buttonsDoneAndFavoriteRecipes } from '../../constants/index';

const DoneAndFavoriteButtons = ({ handleFilters }) => (
  <div className="main-foods-buttons-container">
    {buttonsDoneAndFavoriteRecipes.map((button) => (
      <button
        className="btn btn-primary"
        style={ { marginTop: 5,
          marginBottom: 5,
          width: 106 } }
        onClick={ (event) => handleFilters(event) }
        key={ button.name }
        value={ button.type }
        type="button"
        data-testid={ button.testId }
      >
        { button.name }
      </button>
    ))}
  </div>
);

DoneAndFavoriteButtons.propTypes = {
  handleFilters: PropTypes.func.isRequired,
};

export default DoneAndFavoriteButtons;
