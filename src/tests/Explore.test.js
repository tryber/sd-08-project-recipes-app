import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import ExploreMain from '../pages/ExploreMain';
import Explore from '../pages/Explore';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(() => { global.fetch = jest.fn(fetchMock); });
afterEach(() => jest.clearAllMocks());
describe('Explore', () => {
  it('explore page', () => {
    renderWithRouterAndStore(<Explore />);
    const title = screen.getByRole('heading', { name: 'Explorar' });
    expect(title).toBeInTheDocument();
    const exploreMeals = screen.getByRole('link', { name: /comidas/i });
    expect(exploreMeals).toHaveAttribute('href', '/explorar/comidas');
    const exploreDrinks = screen.getByRole('link', { name: /bebidas/i });
    expect(exploreDrinks).toHaveAttribute('href', '/explorar/bebidas');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('meals explore', async () => {
    const pathname = '/explorar/comidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<ExploreMain { ...props } />, { route: pathname });
    const title = await screen.findByRole('heading', { name: /comidas/i });
    expect(title).toBeInTheDocument();
    const linkIngredients = screen.getByRole('link', { name: /por ingredientes/i });
    expect(linkIngredients).toBeInTheDocument();
    const linkOrigin = screen.getByRole('link', { name: /por local de origem/i });
    expect(linkOrigin).toBeInTheDocument();
    const randomButton = screen.getByRole('button', { name: /me surpreenda!/i });
    expect(randomButton).toBeInTheDocument();
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    userEvent.click(randomButton);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
  });

  it('drinks explore', async () => {
    const pathname = '/explorar/bebidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<ExploreMain { ...props } />, { route: pathname });
    const title = await screen.findByRole('heading', { name: /bebidas/i });
    expect(title).toBeInTheDocument();
    const linkIngredients = screen.getByRole('link', { name: /por ingredientes/i });
    expect(linkIngredients).toBeInTheDocument();
    const linkOrigin = screen.queryByRole('link', { name: /por local de origem/i });
    expect(linkOrigin).not.toBeInTheDocument();
    const randomButton = screen.getByRole('button', { name: /me surpreenda!/i });
    expect(randomButton).toBeInTheDocument();
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
