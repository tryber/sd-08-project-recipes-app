import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Comidas from '../Pages/Comidas';

const TWELVE = 12;
const BEEF_FILTER = 'Beef-category-filter';

describe('<Comidas />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a pagina contem 12 cards', async () => {
    renderWithRouterAndRedux(<Comidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId('12-recipe-card')).toBe(null);
  });

  it('Verifica se a pagina contem 6 botões de filtro', async () => {
    renderWithRouterAndRedux(<Comidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByTestId(BEEF_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  });

  it('Verifica se o botão filtra as'
    + 'receitas de acordo com o filtro selecionado'
    + 'e o botão All retira os filtros', async () => {
    renderWithRouterAndRedux(<Comidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const goatButton = screen.getByTestId('Goat-category-filter');
    userEvent.click(goatButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/mbuzi choma/i)).toBeInTheDocument();
    expect(screen.queryByTestId('1-recipe-card')).toBe(null);

    const ChickenButton = screen.getByTestId('Chicken-category-filter');
    userEvent.click(ChickenButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/Brown Stew Chicken/i)).toBeInTheDocument();
    expect(screen.queryByText(/mbuzi choma/i)).toBe(null);

    const AllButton = screen.getByTestId('All-category-filter');
    userEvent.click(AllButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.queryByText(/Brown Stew Chicken/i)).toBe(null);
  });

  it('Caso a busca do header conter uma receita ser'
  + 'redirecionado para a pagina de detalhes da receita', async () => {
    renderWithRouterAndRedux(<Comidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Goat Meat');

    const findButton = screen.getByTestId('exec-search-btn');
    userEvent.click(findButton);
  });

  it('Caso a busca não retornar nenhuma receita exibir um alert', async () => {
    // jest.spyOn(global, 'alert').mockImplementation((alert) => console.log(alert));
    window.alert = jest.fn();

    renderWithRouterAndRedux(<Comidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const searchButton = screen.getByAltText(/pesquisar/i);
    userEvent.click(searchButton);

    const searchInput = screen.getByLabelText(/pesquisar/i);
    userEvent.type(searchInput, 'XABLAU');

    const findButton = screen.getByTestId('exec-search-btn');
    userEvent.click(findButton);
  });

  it('Verifica se clicar no filtro novamente reseta o filtro', async () => {
    renderWithRouterAndRedux(<Comidas />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const BeefButton = screen.getByTestId(BEEF_FILTER);
    userEvent.click(BeefButton);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/beef wellington/i)).toBeInTheDocument();
    expect(screen.queryByText(/corba/i)).toBe(null);

    const BeefButton2 = screen.getByTestId(BEEF_FILTER);
    userEvent.click(BeefButton2);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.queryByText(/beef wellington/i)).toBe(null);
  });
});
