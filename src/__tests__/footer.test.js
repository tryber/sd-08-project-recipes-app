import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
// import FoodInProgressCard from '../components/FoodInProgressCard';
import Footer from '../components/Footer';

describe('Footer.jsx component', () => {
  it('should render', () => {
    // await act(async () => {
    const { history } = renderWithRouter(<Footer />, '/comidas');

    expect(history.location.pathname).toBe('/comidas');
    console.log(history.location.pathname);

    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBottomBtn);

    expect(history.location.pathname).toBe('/bebidas');

    const exploreBottomBtn = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBottomBtn);

    expect(history.location.pathname).toBe('/explorar');

    const foodBottomBtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodBottomBtn);

    expect(history.location.pathname).toBe('/comidas');

    // });
  });
});
