import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function RecipesCards({ path, elem, type, index }) {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ () => history.push(`${path}/${elem[`id${type}`]}`) }
      data-testid={ `${index}-recipe-card` }
      className="card-container regular-button"
    >
      <div className="card-content">
        <div className="img-content">
          <img
            className="card-img"
            src={ elem[`str${type}Thumb`] }
            alt={ elem[`str${type}`] }
            data-testid={ `${index}-card-img` }
          />
        </div>
        <div className="card-title">
          <h4 data-testid={ `${index}-card-name` }>{ elem[`str${type}`] }</h4>
          <span>{ elem[`id${type}`] }</span>
        </div>
      </div>
    </button>
  );
}

RecipesCards.propTypes = {
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  elem: PropTypes.objectOf(PropTypes.string).isRequired,
};
