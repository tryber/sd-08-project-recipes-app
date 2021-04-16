import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

describe('Explore.js', () => {
  test('if the explore food btn redirect to the food page', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: [],
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar'],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar');

    const exploreFoodBtn = screen.getByTestId('explore-food');
    userEvent.click(exploreFoodBtn);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  test('if the explore drink btn redirect to the drink page', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: [],
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar'],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar');

    const exploreDrinkBtn = screen.getByTestId('explore-drinks');
    userEvent.click(exploreDrinkBtn);

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
