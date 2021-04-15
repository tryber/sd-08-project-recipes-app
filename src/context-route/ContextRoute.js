import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// https://stackoverflow.com/questions/50155909/how-to-use-context-api-with-react-router-v4/50158702#50158702
function ContextRoute({ contextComponent, component, ...rest }) {
  const Provider = contextComponent;
  const Component = component;

  return (
    <Route { ...rest }>
      <Provider>
        <Component />
      </Provider>
    </Route>
  );
}

ContextRoute.propTypes = {
  contextComponent: PropTypes.elementType.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default ContextRoute;
