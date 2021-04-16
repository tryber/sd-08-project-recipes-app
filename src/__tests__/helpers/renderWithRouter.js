import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Provider from '../../core/Provider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory();
  history.push(route);
  return {
    ...render(
      <Router history={ history }>
        <Provider>{component}</Provider>
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;
