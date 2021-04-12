import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Component Footer', () => {
  test('there is drinks btn element', () => {
    renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
  });

  test('there is explore btn element', () => {
    renderWithRouter(<Footer />);

    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
  });

  test('there is food btn element', () => {
    renderWithRouter(<Footer />);

    const foodBtn = screen.getByTestId('food-bottom-btn');
    expect(foodBtn).toBeInTheDocument();
  });

  test('redirect for drinks', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  test('redirect for explore', () => {
    const { history } = renderWithRouter(<Footer />);

    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    fireEvent.click(exploreBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  test('redirect for foods', () => {
    const { history } = renderWithRouter(<Footer />);

    const foodBtn = screen.getByTestId('food-bottom-btn');
    fireEvent.click(foodBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
