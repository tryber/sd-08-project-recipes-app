import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreIngredient from '../Pages/ExplorarIngredientes';

const TWELVE = 12;

describe('<ExploreIngredients />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a tela contem 12 cards na tela de comidas', async () => {
    renderWithRouterAndRedux(<ExploreIngredient />, {
      initialEntries: ['/explorar/comidas/ingredientes'],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId('12-ingredient-card')).toBe(null);
  });

  it('Verifica se a tela contem 12 cards na tela de bebidas', async () => {
    renderWithRouterAndRedux(<ExploreIngredient />, {
      initialEntries: ['/explorar/bebidas/ingredientes'],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId('12-ingredient-card')).toBe(null);
  });

  it('Testa se ao clicar no card de bebidas vai para a tela de comidas', async () => {
    const { history } = renderWithRouterAndRedux(<ExploreIngredient />, {
      initialEntries: ['/explorar/bebidas/ingredientes'],
    });
    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    userEvent.click(screen.getByText('Gin'));

    expect(history.location.pathname).toBe('/bebidas');
  });

  it('Testa se ao clicar no card de comidas vai para a tela de comidas', async () => {
    const { history } = renderWithRouterAndRedux(<ExploreIngredient />, {
      initialEntries: ['/explorar/comidas/ingredientes'],
    });
    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    userEvent.click(screen.getByText('Beef'));

    expect(history.location.pathname).toBe('/comidas');
  });
});
