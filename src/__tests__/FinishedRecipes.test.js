import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

import { doneStorageRecipes } from '../TestsMocks/mockStorageRecipes';

const ENTRIE_FINISHED = '/receitas-feitas';
const FIRSTCARDTESTID = '0-horizontal-name';
const ARRABIATA = 'Spicy Arrabiata Penne';
const AQUAMARINE = 'Aquamarine';

describe('FinishedRecipes.js', () => {
  test('if the FinishedRecipes page render', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FINISHED],
      initialState: {},
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: JSON.stringify(doneStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe(ENTRIE_FINISHED);

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Receitas Feitas');

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(ARRABIATA);

    const secondRecipe = screen.getByTestId('1-horizontal-name');
    expect(secondRecipe).toHaveTextContent(AQUAMARINE);
  });

  test('if the FinishedRecipes render with no recipes', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FINISHED],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: '',
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const textNoRecipe = screen.getByText(/No done recipes yet!/i);
    expect(textNoRecipe).toBeInTheDocument();
  });

  test('if the FinishedRecipes filter by food', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FINISHED],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: JSON.stringify(doneStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(foodFilterBtn);

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(ARRABIATA);
  });

  test('if the FinishedRecipes filter by drink', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FINISHED],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: JSON.stringify(doneStorageRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilterBtn);

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(AQUAMARINE);
  });

  test('if the FinishedRecipes filtered by drink with no tag', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FINISHED],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: JSON.stringify([{
            id: '178319',
            type: 'bebida',
            area: '',
            category: 'Cocktail',
            alcoholicOrNot: 'Alcoholic',
            name: 'Aquamarine',
            image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
            doneDate: '05/04/2021',
            tags: '',
          }]),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilterBtn);

    const firstRecipe = screen.getByTestId(FIRSTCARDTESTID);
    expect(firstRecipe).toHaveTextContent(AQUAMARINE);
  });

  test('if the FinishedRecipes filter by food with tags', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FINISHED],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: JSON.stringify([{
            id: '52771',
            type: 'comida',
            area: 'Italian',
            category: 'Vegetarian',
            alcoholicOrNot: '',
            name: 'Spicy Arrabiata Penne',
            image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
            doneDate: '05/04/2021',
            tags: ['Pasta', 'Curry'],
          }]),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(foodFilterBtn);

    const recipeTag = screen.getByTestId('0-Pasta-horizontal-tag');
    expect(recipeTag).toHaveTextContent('Pasta');
  });
});
