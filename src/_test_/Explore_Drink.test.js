import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreDrink from '../Pages/ExplorarBebidas';

describe('<ExploreFood />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a tela contem o botão de ingredientes', () => {
    const { history } = renderWithRouterAndRedux(<ExploreDrink />);

    const ingredient = screen.getByTestId('explore-by-ingredient');
    expect(ingredient).toBeInTheDocument();

    userEvent.click(ingredient);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });

  it('Verifica se a tela contem o botão de surpreenda', () => {
    const { history } = renderWithRouterAndRedux(<ExploreDrink />);

    const surprise = screen.getByTestId('explore-surprise');
    expect(surprise).toBeInTheDocument();

    userEvent.click(surprise);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
