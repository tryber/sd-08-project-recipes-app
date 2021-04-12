import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Provider from '../context/Provider';

// https://www.codota.com/code/javascript/functions/history/createMemoryHistory
const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return ({
    ...render(
      <Provider>
        <Router history={ history }>
          { component }
        </Router>
      </Provider>,
    ),
    history,
  });
};

export default renderWithRouter;
