import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
// import FoodInProgressCard from '../components/FoodInProgressCard';
import ExploreFoodsByIngredients from '../containers/ExploreFoodsByIngredients';

describe('MainIngredientCard.jsx component', () => {
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  it('should render', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<ExploreFoodsByIngredients />,
        '/explorar/comidas/ingredientes');

      expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
      console.log(history.location.pathname);
    });

    const ingredintCardLink = screen.getByTestId('0-main-ingredient-card-link');
    userEvent.click(ingredintCardLink);
    expect(mockTest).toBeCalled();

    const ingredintCardLinkImage = screen
      .getByTestId('0-main-ingredient-card-link-image');
    userEvent.click(ingredintCardLinkImage);
    expect(mockTest).toBeCalled();
  });
});
