import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import favoriteRecipes from './mocks/localStorageFavoriteRecipes';

import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../containers/FavoriteRecipes';

describe('FavoriteRecipes.jsx container', () => {
  it('should render', async () => {
    beforeEach(cleanup);
    await act(async () => {
      renderWithRouter(
        <FavoriteRecipes />,
      );
    });

    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();

    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(store.length);
  });

  it('shoul render only foods when select food filter button', async () => {
    beforeEach(cleanup);
    await act(async () => {
      renderWithRouter(
        <FavoriteRecipes />,
        {
          route: '/receitas-favoritas',
        },
      );
    });

    const foodButton = screen.getByRole('button', {
      name: /food/i,
    });

    expect(foodButton).toBeInTheDocument();

    act(() => {
      userEvent.click(foodButton);
    });

    const foodImage = screen.getByTestId('0-horizontal-image');
    // console.log(foodImage);
    expect(foodImage.src).toBe(favoriteRecipes[0].image);

    const foodTitle = screen.getByTestId('0-horizontal-name');
    expect(foodTitle.innerHTML).toBe(favoriteRecipes[0].name);

    const foodCategory = screen.getByTestId('0-horizontal-top-text');
    expect(foodCategory.innerHTML)
      .toBe(`${favoriteRecipes[0].area} - ${favoriteRecipes[0].category}`);
  });

  it('should handle favorite options', async () => {
    beforeEach(cleanup);
    await act(async () => {
      renderWithRouter(
        <FavoriteRecipes />,
        {
          route: '/receitas-favoritas-test',
        },
      );
    });
    const favoriteButton0 = screen.getByTestId(/0-handle-favorite-button/i);
    console.log(favoriteButton0.length);

    await act(async () => {
      userEvent.click(favoriteButton0);
    });
    const newFavoriteButtons = screen.getAllByTestId(/-handle-favorite-button/i);
    console.log(newFavoriteButtons.length);
  });
});
