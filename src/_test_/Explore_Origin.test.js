import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreOrigin from '../Pages/ExplorarOrigem';

const TWELVE = 12;
const ID_SELECT = 'explore-by-area-dropdown';
const ENTRIES_URL = '/explorar/comidas/area';
const TWENTY_SEVEN = 27;

describe('<ExploreOrigem / >', () => {
  it('Verifica se a tela contem 12 cards', async () => {
    renderWithRouterAndRedux(<ExploreOrigin />, {
      initialEntries: [ENTRIES_URL],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId('12-recipe-card')).toBe(null);
  });

  it('Verifica se a tela contem um dropdown list', async () => {
    renderWithRouterAndRedux(<ExploreOrigin />, {
      initialEntries: [ENTRIES_URL],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const dropDown = screen.getByTestId(ID_SELECT);
    expect(dropDown).toBeInTheDocument();
  });

  it('Verifica se o dropdown contem 27 options', async () => {
    renderWithRouterAndRedux(<ExploreOrigin />, {
      initialEntries: [ENTRIES_URL],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(TWENTY_SEVEN);
  });

  it('Verifica se dropdown All reseta a origem', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    renderWithRouterAndRedux(<ExploreOrigin />, {
      initialEntries: [ENTRIES_URL],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    userEvent.selectOptions(screen.getByTestId(ID_SELECT), ['Japanese']);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const japaneseFood = screen.getByText('Chicken Karaage');
    expect(japaneseFood).toBeInTheDocument();
    expect(screen.queryByText('Corba')).toBe(null);

    userEvent.selectOptions(screen.getByTestId(ID_SELECT), ['All']);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText('Corba')).toBeInTheDocument();
    expect(screen.queryByText('Chicken Karaage')).toBe(null);
  });
});
