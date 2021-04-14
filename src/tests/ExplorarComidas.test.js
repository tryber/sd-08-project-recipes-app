import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExplorarComidas from '../pages/ExplorarComidas';

describe('Page ExplorarComidas', () => {
  it('has an "explore by ingredients" button', () => {
    renderWithRouter(<ExplorarComidas />);

    const exploreByIngredientsButton = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientsButton).toBeInTheDocument();
  });

  it('has an "explore by area" button', () => {
    renderWithRouter(<ExplorarComidas />);

    const exploreByAreaButton = screen.getByTestId('explore-by-area');
    expect(exploreByAreaButton).toBeInTheDocument();
  });

  it('has a "surprise" button', () => {
    renderWithRouter(<ExplorarComidas />);

    const exploreSurpriseButton = screen.getByTestId('explore-surprise');
    expect(exploreSurpriseButton).toBeInTheDocument();
  });

  it('redirects to "explore foods by ingredients" page', () => {
    const { history } = renderWithRouter(<ExplorarComidas />);

    const exploreByIngredientsButton = screen.getByTestId('explore-by-ingredient');
    fireEvent.click(exploreByIngredientsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('redirects to "explore foods by area" page', () => {
    const { history } = renderWithRouter(<ExplorarComidas />);

    const exploreByAreaButton = screen.getByTestId('explore-by-area');
    fireEvent.click(exploreByAreaButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });

  it('redirects to a random "food details" page', () => {
    const { history } = renderWithRouter(<ExplorarComidas />);

    const exploreSurpriseButton = screen.getByTestId('explore-surprise');
    fireEvent.click(exploreSurpriseButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
