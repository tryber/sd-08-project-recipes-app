import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import Header from '../components/Header';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(() => { global.fetch = jest.fn(fetchMock); });
afterEach(() => jest.clearAllMocks());
const searchButtonId = 'exec-search-btn';
const searchBarButtonId = 'search-top-btn';
const noSearchButton = async (path) => {
  const props = { location: { pathname: path } };
  renderWithRouterAndStore(<Header { ...props } />, { route: path });
  const title = await screen.findByRole(
    'heading', { name: new RegExp(path.split(/[-/]/).pop(), 'i') },
  );
  expect(title).toBeInTheDocument();
  const searchBarButton = screen.queryByTestId(searchBarButtonId);
  expect(searchBarButton).not.toBeInTheDocument();
};
describe('Header', () => {
  it('Search button', () => {
    const pathname = '/bebidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<Header { ...props } />, { route: pathname });
    const title = screen.getByRole('heading', { name: /bebidas/i });
    expect(title).toBeInTheDocument();
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    const searchBarButton = screen.getByTestId(searchBarButtonId);
    expect(searchBarButton).toBeInTheDocument();
    const searchBar = screen.queryByRole('textbox');
    expect(searchBar).not.toBeInTheDocument();
    userEvent.click(searchBarButton);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('No search button', () => {
    noSearchButton('/perfil');
    noSearchButton('/explorar');
    noSearchButton('/receitas-feitas');
    noSearchButton('/receitas-favoritas');
    noSearchButton('/explorar/comidas/ingredientes');
    noSearchButton('/explorar/bebidas/ingredientes');
    noSearchButton('/explorar/comidas');
    noSearchButton('/explorar/bebidas');
  });
  // it('Search button not in explore', () => {
  //   const pathname = '/explorar';
  //   const props = { location: { pathname } };
  //   renderWithRouterAndStore(<Header { ...props } />, { route: pathname });
  //   const title = screen.getByRole('heading', { name: /explorar/i });
  //   expect(title).toBeInTheDocument();
  //   const searchBarButton = screen.queryByTestId(searchBarButtonId);
  //   expect(searchBarButton).not.toBeInTheDocument();
  // });
  // it('Search button not in done recipes', () => {
  //   const pathname = '/receitas-feitas';
  //   const props = { location: { pathname } };
  //   renderWithRouterAndStore(<Header { ...props } />, { route: pathname });
  //   const title = screen.getByRole('heading', { name: /explorar/i });
  //   expect(title).toBeInTheDocument();
  //   const searchBarButton = screen.queryByTestId(searchBarButtonId);
  //   expect(searchBarButton).not.toBeInTheDocument();
  // });
  it('SearchBar ingredient', async () => {
    const pathname = '/comidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<Header { ...props } />, { route: pathname });
    const title = await screen.findByRole('heading', { name: /comidas/i });
    expect(title).toBeInTheDocument();
    const searchBarButton = screen.getByTestId(searchBarButtonId);
    userEvent.click(searchBarButton);
    const searchBar = screen.queryByRole('textbox');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.type(searchBar, 'Chicken');
    userEvent.click(screen.getByTestId(searchButtonId));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
  it('SearchBar name', async () => {
    const pathname = '/comidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<Header { ...props } />, { route: pathname });
    const searchBarButton = await screen.findByTestId(searchBarButtonId);
    userEvent.click(searchBarButton);
    const searchBar = screen.queryByRole('textbox');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(searchBar, 'Chicken');
    userEvent.click(screen.getByTestId(searchButtonId));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken');
  });
  it('SearchBar first letter', async () => {
    const pathname = '/comidas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<Header { ...props } />, { route: pathname });
    const searchBarButton = await screen.findByTestId(searchBarButtonId);
    userEvent.click(searchBarButton);
    const searchBar = screen.queryByRole('textbox');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(searchBar, 'C');
    userEvent.click(screen.getByTestId(searchButtonId));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=C');
  });
});
