import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { favoriteStorageRecipes } from '../TestsMocks/mockStorageRecipes';

const ENTRIE_FAVORITE = '/receitas-favoritas';

describe('FavoritePageLikeBtn.js', () => {
  test('if remove liked recipe', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON
            .stringify(favoriteStorageRecipes),
        } }
      >
        <FavoriteRecipes />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const cardName = screen.getByTestId('1-horizontal-name');
    const button = screen.getByTestId('1-horizontal-favorite-btn');
    expect(cardName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(cardName).not.toBeInTheDocument();
  });

  test('if there is none liked recipe', () => {
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_FAVORITE],
      initialState: {},
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {} }
      >
        <FavoriteRecipes />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const message = screen.getByText('No favorite recipes yet!');
    expect(message).toBeInTheDocument();
  });
});
