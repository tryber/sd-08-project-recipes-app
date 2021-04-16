import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';
import { dryMartiniSingleRecipe } from '../TestsMocks/singleDrinkRecipe';

const ENTRIES_DRINK = '/bebidas/178319/in-progress';

describe('ProgressDrink.js', () => {
  test('if the ProgressDrink page render with Drink', () => {
    const recipes = {
      recipes: [],
      singleRecipe: dryMartiniSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_DRINK],
      initialState: {
        recipes,
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Dry Martini');

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });
});
