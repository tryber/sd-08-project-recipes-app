import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
import DrinkDetails from '../containers/DrinkDetails';

describe('DrinkDetails.jsx container', () => {
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  it('should render, fetch api and handle clicks', async () => {
    const { history } = renderWithRouter(<DrinkDetails />, '/bebidas/178319');
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(2);
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/bebidas/178319');

    const shareButton = screen.getByTestId('share-btn');
    // console.log(shareButton);
    expect(shareButton).toBeInTheDocument();

    const handleFavorite = screen.getByTestId('favorite-btn');
    expect(handleFavorite).toBeInTheDocument();

    const emptyStore = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(emptyStore);
    expect(emptyStore).toBe(null);

    userEvent.click(handleFavorite);

    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(store);
    expect(store.length).toBe(1);

    userEvent.click(handleFavorite);
    const newEmptyStore = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(emptyStore);
    expect(newEmptyStore).toBe(null);

    const startRecipe = screen.getByTestId('start-recipe-btn');
    await act(async () => {
      userEvent.click(startRecipe);
    });
    expect(history.location.pathname).toBe('/bebidas/178319/in-progress');
  });
});
