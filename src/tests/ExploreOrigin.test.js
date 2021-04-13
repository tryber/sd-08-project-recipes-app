import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import ExploreOrigin from '../pages/ExploreOrigin';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(() => { global.fetch = jest.fn(fetchMock); });
afterEach(() => jest.clearAllMocks());
describe('Explore Origin', () => {
  it('meals explore', async () => {
    const pathname = '/explorar/comidas/area';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<ExploreOrigin { ...props } />, { route: pathname });
    const title = await screen.findByRole('heading', { name: /explorar origem/i });
    expect(title).toBeInTheDocument();
    const linkRecipes = screen.getAllByTestId(/.-recipe-card/);
    const linksLength = 12;
    expect(linkRecipes).toHaveLength(linksLength);
    const firstItem = within(linkRecipes[0]).getByText('Corba');
    expect(firstItem).toBeInTheDocument();
    const areaSelector = screen.getByRole('combobox');
    expect(areaSelector).toBeInTheDocument();
    userEvent.selectOptions(areaSelector, 'American');
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
    // const newRecipes = await screen.findAllByTestId(/.-recipe-card/);
    // const newFirstItem = within(newRecipes[0]).getByText('Banana Pancakes');
    // expect(newFirstItem).toBeInTheDocument();
    const footer = await screen.findByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
