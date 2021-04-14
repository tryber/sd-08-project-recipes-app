import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import OrigemComidas from '../pages/OrigemComidas';

afterEach(cleanup);
beforeEach(() => jest.clearAllMocks());

describe('Page OrigemComidas', () => {
  it('shows recipe cards when the page loads', async () => {
    const mockedApiReturn = {
      meals: [{ strMeal: 'Food Name', idMeal: '12345' }],
    };

    const response = { json: jest.fn().mockResolvedValue(mockedApiReturn) };
    global.fetch = jest.fn().mockResolvedValue(response);

    renderWithRouter(<OrigemComidas />);

    const recipeCard = await screen.findAllByTestId(/recipe-card/i);
    expect(recipeCard[0].children[0].innerHTML).toEqual('Food Name');
  });

  it('shows regions dropdown when the page loads', async () => {
    renderWithRouter(<OrigemComidas />);

    const dropdownOption = await screen.findByTestId('All-option');
    expect(dropdownOption.innerHTML).toEqual('All');
  });

  it('redirects to "food details" page when clicked on a recipe card', async () => {
    const { history } = renderWithRouter(<OrigemComidas />);

    const recipeCard = await screen.findAllByTestId(/recipe-card/i);
    fireEvent.click(recipeCard[0]);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/12345');
  });
});
