import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Bebidas from '../Pages/Bebidas';

const TWELVE = 12;
const ORDINARY_FILTER = 'Ordinary Drink-category-filter';

describe('<Bebidas />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a pagina contem 12 cards', async () => {
    renderWithRouterAndRedux(<Bebidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId('12-recipe-card')).toBe(null);
  });

  it('Verifica se a pagina contem 6 botões de filtro', async () => {
    renderWithRouterAndRedux(<Bebidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByTestId(ORDINARY_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Milk / Float / Shake-category-filter'))
      .toBeInTheDocument();
    expect(screen.getByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  });

  it('Verifica se o botão filtra as'
    + 'bebidas de acordo com o filtro selecionado'
    + 'e o botão All retira os filtros', async () => {
    renderWithRouterAndRedux(<Bebidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const CocoaButton = screen.getByTestId('Cocoa-category-filter');
    userEvent.click(CocoaButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/orange scented hot chocolate/i)).toBeInTheDocument();
    expect(screen.queryByText('GG')).toBe(null);

    const CocktailButton = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(CocktailButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/747 drink/i)).toBeInTheDocument();
    expect(screen.queryByText(/orange scented hot chocolate/i)).toBe(null);

    const AllButton = screen.getByTestId('All-category-filter');
    userEvent.click(AllButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/GG/i)).toBeInTheDocument();
    expect(screen.queryByText(/747 drink/i)).toBe(null);
  });

  it('Caso a busca do header conter uma receita ser'
  + 'redirecionado para a pagina de detalhes da receita', async () => {
    renderWithRouterAndRedux(<Bebidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'A1');

    const findButton = screen.getByTestId('exec-search-btn');
    userEvent.click(findButton);
  });

  it('Caso a busca não retornar nenhuma receita exibir um alert', async () => {
    renderWithRouterAndRedux(<Bebidas />, {
      initialEntries: ['/Bebidas'],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const searchButton = screen.getByAltText(/pesquisar/i);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'XABLAU');

    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));

    const findButton = screen.getByTestId('exec-search-btn');
    userEvent.click(findButton);
  });

  it('Verifica se clicar no filtro novamente reseta o filtro', async () => {
    renderWithRouterAndRedux(<Bebidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const OrdinaryButton = screen.getByTestId(ORDINARY_FILTER);
    userEvent.click(OrdinaryButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/501 blue/i)).toBeInTheDocument();
    expect(screen.queryByText(/GG/i)).toBe(null);

    const OrdinaryButton2 = screen.getByTestId(ORDINARY_FILTER);
    userEvent.click(OrdinaryButton2);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/GG/i)).toBeInTheDocument();
    expect(screen.queryByText(/501 blue/i)).toBe(null);
  });

  it('Testa se ao clicar no card vai para a tela de detalhes', async () => {
    const { history } = renderWithRouterAndRedux(<Bebidas />, {
      initialEntries: ['/bebidas'],
    });

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    userEvent.click(screen.getByText('GG'));

    expect(history.location.pathname).toBe('/bebidas/15997');
  });
});
