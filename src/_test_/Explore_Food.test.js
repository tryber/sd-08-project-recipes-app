import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreFood from '../Pages/ExplorarComidas';

describe('<ExploreFood />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a tela contem o botão de ingredientes', () => {
    const { history } = renderWithRouterAndRedux(<ExploreFood />);

    const ingredient = screen.getByTestId('explore-by-ingredient');
    expect(ingredient).toBeInTheDocument();

    userEvent.click(ingredient);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Verifica se a tela contem o botão de origem', () => {
    const { history } = renderWithRouterAndRedux(<ExploreFood />);

    const origin = screen.getByTestId('explore-by-area');
    expect(origin).toBeInTheDocument();

    userEvent.click(origin);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });

  it('Verifica se a tela contem o botão de surpreenda', () => {
    const { history } = renderWithRouterAndRedux(<ExploreFood />);

    const surprise = screen.getByTestId('explore-surprise');
    expect(surprise).toBeInTheDocument();

    userEvent.click(surprise);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
