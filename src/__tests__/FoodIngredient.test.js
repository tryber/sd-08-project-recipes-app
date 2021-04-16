import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
// import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

import { fetchInitialMealIngridients } from '../TestsMocks/mockMealIngredients';

describe('FoodIngredient.js', () => {
  test('if the FoodIngredient page render', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: fetchInitialMealIngridients,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/comidas/ingredientes'],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');

    const title = screen
      .getByRole('heading', { level: 1, name: /Explorar Ingredientes/i });
    expect(title).toBeInTheDocument();
  });
});
