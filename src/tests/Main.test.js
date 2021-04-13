import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import Main from '../pages/Main';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(() => { global.fetch = jest.fn(fetchMock); });
afterEach(() => jest.clearAllMocks());
describe('Main', () => {
  it('meals', async () => {
    const pathname = '/comidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<Main { ...props } />, { route: pathname });
    const firstCategory = await screen.findByRole('button', { name: /beef/i });
    expect(firstCategory).toBeInTheDocument();
    const categoriesLength = 6;
    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons).toHaveLength(categoriesLength);
    const recipes = await screen.findAllByTestId(/.-recipe-card/);
    const recipesLength = 12;
    expect(recipes).toHaveLength(recipesLength);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    userEvent.click(categoryButtons[0]);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  });
  it('drinks', async () => {
    const pathname = '/bebidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<Main { ...props } />, { route: pathname });
    const firstCategory = await screen.findByRole('button', { name: /ordinary/i });
    expect(firstCategory).toBeInTheDocument();
    const categoriesLength = 6;
    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons).toHaveLength(categoriesLength);
    const recipes = await screen.findAllByTestId(/.-recipe-card/);
    const recipesLength = 12;
    expect(recipes).toHaveLength(recipesLength);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  // it.only('meals categories', async () => {
  //   // const pathname = '/bebidas';
  //   // const props = { location: { pathname } };
  //   const { history } = renderWithRouterAndStore(<App />);
  //   const recipes = await screen.findAllByTestId(/.-recipe-card/);
  //   userEvent.click(recipes[0]);
  //   expect(history.location.pathname).toBe('/bebidas/15997');
  // });
  it('path name is comidas and be located at "src/pages"', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
    const props = { location: { pathname: '/comidas' } };
    const { container } = renderWithRouterAndStore(<Main { ...props } />, '/comidas', {});
    expect(container).toBeDefined();
  });
});
