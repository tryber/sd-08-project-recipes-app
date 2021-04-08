import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExplorarBebidas from '../pages/ExplorarBebidas';

describe('Page ExplorarBebidas', () => {
  it('has an "explore by ingredients" button', () => {
    renderWithRouter(<ExplorarBebidas />);

    const exploreByIngredientsButton = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientsButton).toBeInTheDocument();
  });

  it('has a "surprise" button', () => {
    renderWithRouter(<ExplorarBebidas />);

    const exploreSurpriseButton = screen.getByTestId('explore-surprise');
    expect(exploreSurpriseButton).toBeInTheDocument();
  });

  it('redirects to "explore drinks by ingredients" page', () => {
    const { history } = renderWithRouter(<ExplorarBebidas />);

    const exploreByIngredientsButton = screen.getByTestId('explore-by-ingredient');
    fireEvent.click(exploreByIngredientsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });

  it('redirects to a random "drink details" page', () => {
    const { history } = renderWithRouter(<ExplorarBebidas />);

    const exploreSurpriseButton = screen.getByTestId('explore-surprise');
    fireEvent.click(exploreSurpriseButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
