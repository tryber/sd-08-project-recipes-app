import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
// import FoodInProgressCard from '../components/FoodInProgressCard';
import FoodDetailsInProgress from '../containers/FoodDetailsInProgress';

describe('FoodInProgressCard.jsx component', () => {
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  it('should render', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<FoodDetailsInProgress />,
        '/comidas/52977/in-progress');

      expect(history.location.pathname).toBe('/comidas/52977/in-progress');
      console.log(history.location.pathname);
    });

    const inProgressCard = screen.getAllByTestId('in-progress-card');
    console.log(inProgressCard.length);

    const shareButton = screen.getAllByTestId('share-btn');
    console.log(shareButton.length);

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(1);

    const handleFavoriteBtn = screen.getAllByTestId('handle-favorite-btn');
    console.log(handleFavoriteBtn.length);
    handleFavoriteBtn.forEach((e) => {
      userEvent.click(e);
      const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(store);
    });
    // userEvent.click(shareButton[0]);
  });
});
