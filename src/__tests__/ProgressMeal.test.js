import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';
import { ArrabiataSingleRecipe } from '../TestsMocks/singleMealRecipe';

const ENTRIES_MEAL = '/comidas/52771/in-progress';

describe('ProgressMeal.js', () => {
  test('if the ProgressMeal page render with Meal', () => {
    const recipes = {
      recipes: [],
      singleRecipe: ArrabiataSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_MEAL],
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
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  test('if the ProgressMeal has checked ingredients', () => {
    const recipes = {
      recipes: [],
      singleRecipe: ArrabiataSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_MEAL],
      initialState: {
        recipes,
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const ingredientChecked = screen.getByText('penne rigate - 1 pound');
    expect(ingredientChecked).not.toHaveAttribute('class', 'completed');

    userEvent.click(ingredientChecked);
    expect(ingredientChecked).toHaveAttribute('class', 'completed');
  });
});
