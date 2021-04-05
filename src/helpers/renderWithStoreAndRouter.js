import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../store/ducks';

const createMockStore = (initialState) => (
  initialState
    ? createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
    : createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
);

const renderWithStoreAndRouter = (
  Component,
  {
    initialState,
    store = createMockStore(initialState),
    routeConfig = ['/'],
  } = {},
) => {
  const history = createMemoryHistory(routeConfig);
  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          { Component }
        </Router>
      </Provider>,
    ),
    store,
    history,
  };
};

export default renderWithStoreAndRouter;
