import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
// import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

import { user } from '../TestsMocks/mockDrinkRecipes';
import { fetchInitialDrinkIngridients } from '../TestsMocks/mockDrinkIngredients';

describe('DrinksIngredient.js', () => {
  test('if the DrinksIngredient page render', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: fetchInitialDrinkIngridients,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/bebidas/ingredientes'],
      initialState: {
        user,
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');

    const title = screen
      .getByRole('heading', { level: 1, name: /Explorar Ingredientes/i });
    expect(title).toBeInTheDocument();
  });
});
