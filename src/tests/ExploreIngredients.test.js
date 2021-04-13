import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import ExploreIngredients from '../pages/ExploreIngredients';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(() => { global.fetch = jest.fn(fetchMock); });
afterEach(() => jest.clearAllMocks());
describe('Explore Ingredients', () => {
  it('meals explore', async () => {
    const pathname = '/explorar/comidas/ingredientes';
    const props = { location: { pathname } };
    const { store } = renderWithRouterAndStore(
      <ExploreIngredients { ...props } />, { route: pathname },
    );
    const title = await screen.findByRole('heading', { name: /explorar ingredientes/i });
    expect(title).toBeInTheDocument();
    const linkIngredients = screen.getAllByTestId(/.-ingredient-card/);
    const linksLength = 12;
    expect(linkIngredients).toHaveLength(linksLength);
    const firstItem = within(linkIngredients[0]).getByText('Chicken');
    expect(firstItem).toBeInTheDocument();
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    userEvent.click(linkIngredients[0]);
    expect(store.getState().recipes.byIngredient).toBe('Chicken');
  });

  it('drinks explore', async () => {
    const pathname = '/explorar/bebidas/ingredientes';
    const props = { location: { pathname } };
    const { store } = renderWithRouterAndStore(
      <ExploreIngredients { ...props } />, { route: pathname },
    );
    const title = await screen.findByRole('heading', { name: /explorar ingredientes/i });
    expect(title).toBeInTheDocument();
    const linkIngredients = screen.getAllByTestId(/.-ingredient-card/);
    const linksLength = 12;
    expect(linkIngredients).toHaveLength(linksLength);
    const firstItem = within(linkIngredients[0]).getByText('Light rum');
    expect(firstItem).toBeInTheDocument();
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    userEvent.click(linkIngredients[0]);
    expect(store.getState().recipes.byIngredient).toBe('Light rum');
  });
});
