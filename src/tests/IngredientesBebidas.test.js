import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import IngredientesBebidas from '../pages/IngredientesBebidas';

afterEach(cleanup);
beforeEach(() => jest.clearAllMocks());

describe('Page IngredientesBebidas', () => {
  it('shows ingredient cards when the page loads', async () => {
    const mockedApiReturn = {
      drinks: [{ strIngredient1: 'Ingredient A' }, { strIngredient1: 'Ingredient B' }],
    };

    const response = { json: jest.fn().mockResolvedValue(mockedApiReturn) };
    global.fetch = jest.fn().mockResolvedValue(response);

    renderWithRouter(<IngredientesBebidas />);

    const ingredientCard = await screen.findAllByTestId(/ingredient-card/i);
    expect(ingredientCard[0].children[0].innerHTML).toEqual('Ingredient A');
    expect(ingredientCard[1].children[0].innerHTML).toEqual('Ingredient B');
  });

  it('redirects to "drink recipes" page when clicked on an ingredient card', async () => {
    const { history } = renderWithRouter(<IngredientesBebidas />);

    const ingredientCard = await screen.findAllByTestId(/ingredient-card/i);
    fireEvent.click(ingredientCard[0]);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});
