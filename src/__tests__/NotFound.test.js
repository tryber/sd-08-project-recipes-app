import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

describe('NotFound.js', () => {
  test('if the explore Drink by area render NotFound', () => {
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/bebidas/area'],
      initialState: {},
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar/bebidas/area');

    const notFound = screen.getByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });
});
