import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Explorar from '../pages/Explorar';

describe('Page Explorar', () => {
  it('has an "explore foods" button', () => {
    renderWithRouter(<Explorar />);

    const exploreFoodsButton = screen.getByTestId('explore-food');
    expect(exploreFoodsButton).toBeInTheDocument();
  });

  it('has an "explore drinks" button', () => {
    renderWithRouter(<Explorar />);

    const exploreDrinksButton = screen.getByTestId('explore-drinks');
    expect(exploreDrinksButton).toBeInTheDocument();
  });

  it('redirects to "explore foods" page', () => {
    const { history } = renderWithRouter(<Explorar />);

    const exploreFoodsButton = screen.getByTestId('explore-food');
    fireEvent.click(exploreFoodsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('redirects to "explore drinks" page', () => {
    const { history } = renderWithRouter(<Explorar />);

    const exploreDrinksButton = screen.getByTestId('explore-drinks');
    fireEvent.click(exploreDrinksButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
