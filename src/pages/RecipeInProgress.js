import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextProgress from '../context/ContextProgress';

function RecipeInProgress({ component: Component, type, ...rest }) {
  return (
    <Route
      { ...rest }
      render={ (routeProps) => (
        <ContextProgress>
          <Component { ...routeProps } type={ type } />
        </ContextProgress>
      ) }
    />
  );
}

RecipeInProgress.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.objectOf(PropTypes.object),
  type: PropTypes.string.isRequired,
};

RecipeInProgress.defaultProps = {
  rest: {},
};

export default RecipeInProgress;
