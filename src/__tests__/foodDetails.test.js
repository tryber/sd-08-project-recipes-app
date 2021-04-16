import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import mockFetch from '../../cypress/mocks/fetch';
// import favoriteRecipes from './mocks/localStorageFavoriteRecipes';
import renderWithRouter from './helpers/renderWithRouter';
import FoodDetails from '../containers/FoodDetails';

describe('FoodDetails.jsx container', () => {
  // beforeEach(() => {
  //   window.getSelection = () => ({
  //     removeAllRanges: () => {},
  //   });
  // });
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  // const mockAlert =
  // const history = createMemoryHistory();
  it('should render, fetch api, handle clicks', async () => {
    // await act(async () => {
    const { history } = renderWithRouter(<FoodDetails />, '/comidas/52771');
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    // });
    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(2);
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/comidas/52771');

    const shareButton = screen.getByTestId('share-btn');
    // console.log(shareButton);
    expect(shareButton).toBeInTheDocument();

    // await act(async () => {
    //   userEvent.click(shareButton);
    // });

    // const copyedLink = screen.getByTestId('copyed');
    // expect(copyedLink).toBeInTheDocument();

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
    expect(history.location.pathname).toBe('/comidas/52771/in-progress');
  });
});
