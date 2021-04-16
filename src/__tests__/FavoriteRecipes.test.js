import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

import { favoriteStorageRecipes } from '../TestsMocks/mockStorageRecipes';

const ENTRIE_FAVORITE = '/receitas-favoritas';
const FIRSTCARDTESTID = '0-horizontal-name';
const MEAL_NAME = 'Spicy Arrabiata Penne';
const DRINK_NAME = 'Aquamarine';

describe('FavoriteRecipes.js', () => {
  test('if the FavoriteRecipes page render', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON.stringify(favoriteStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe(ENTRIE_FAVORITE);

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Receitas Favoritas');

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(MEAL_NAME);

    const secondRecipe = screen.getByTestId('1-horizontal-name');
    expect(secondRecipe).toHaveTextContent(DRINK_NAME);
  });

  test('if the FavoriteRecipes render with no recipes', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: '',
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const textNoRecipe = screen.getByText(/No favorite recipes yet!/i);
    expect(textNoRecipe).toBeInTheDocument();
  });

  test('if the FavoriteRecipes filter by food', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON.stringify(favoriteStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(foodFilterBtn);

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(MEAL_NAME);
  });

  test('if the FavoriteRecipes filter by drink', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON.stringify(favoriteStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilterBtn);

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(DRINK_NAME);
  });

  test('if the FavoriteRecipes filter by all', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON.stringify(favoriteStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilterBtn);
    expect(firstRecipe).toHaveTextContent(MEAL_NAME);
  });
});
