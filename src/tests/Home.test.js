import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import Home from '../pages/Home/Home';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
jest.spyOn(window, 'alert').mockImplementation(() => {});
describe('1 - Verifica os elementos presentes no Header', () => {
  test('Verifica se o título está presente e contém o texto "Comidas"', () => {
    const { getByTestId } = renderWithRouter(<Home title="Comidas" />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Comidas');
  });
  test('Verifica de exite o botão perfil e se funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<Home title="Comidas" />);
    const btnProfile = getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(btnProfile).toBeInTheDocument();
    expect(pathname).toBe('/perfil');
  });
  test('Verifica se exite o botão pesquisar e se funciona corretamente', async () => {
    const { getByTestId } = renderWithRouter(<Home title="Comidas" />);
    const btnSearch = getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    const searchInput = getByTestId('search-input');
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetterRadio = getByTestId('first-letter-search-radio');
    const btnExecSearch = getByTestId('exec-search-btn');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnExecSearch).toBeInTheDocument();
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(btnExecSearch);

    const card = await screen.findByTestId('0-card-name');
    expect(card.innerHTML).toBe('Apple Frangipan Tart');

    userEvent.click(btnSearch);
    expect(searchInput).not.toBeInTheDocument();
  });
});
describe('2 - Verifica os botões de filtro', () => {
  test('Verifica se existem 6 botões de filtro', async () => {
    renderWithRouter(<Home title="Comidas" />);

    const btnAll = await screen.findByTestId('All-category-filter');
    const btnBeef = await screen.findByTestId('Beef-category-filter');
    const btnBreakfast = await screen.findByTestId('Breakfast-category-filter');
    const btnChicken = await screen.findByTestId('Chicken-category-filter');
    const btnDessert = await screen.findByTestId('Dessert-category-filter');
    const btnGoat = await screen.findByTestId('Goat-category-filter');
    expect(btnAll).toBeInTheDocument();
    expect(btnBeef).toBeInTheDocument();
    expect(btnBreakfast).toBeInTheDocument();
    expect(btnChicken).toBeInTheDocument();
    expect(btnDessert).toBeInTheDocument();
    expect(btnGoat).toBeInTheDocument();
    expect(btnAll.innerHTML).toBe('All');
    expect(btnBeef.innerHTML).toBe('Beef');
    expect(btnBreakfast.innerHTML).toBe('Breakfast');
    expect(btnChicken.innerHTML).toBe('Chicken');
    expect(btnDessert.innerHTML).toBe('Dessert');
    expect(btnGoat.innerHTML).toBe('Goat');
  });
});
describe('3 - Verifica a rota de detalhes da receita', () => {
  test('Verifica se ao clicar no card da receita é direcionada para os detalhes', async () => {
    const { history } = renderWithRouter(<Home title="Comidas" />);
    const card = await screen.findByTestId(`0-recipe-card`);
    expect(card).toBeInTheDocument();
    userEvent.click(card);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52977');
  });
});
describe('4 - Verifica o funcionamento da tela de bebidas', () => {
  test('Verifica se o título está presente e contém o texto "Bebidas"', () => {
    const { getByTestId } = renderWithRouter(<Home title="Bebidas" />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Bebidas');
  });
});
describe('5 - Verifica o funcionamento da pesquisa por ingrediente', () => {
  test('Pesquisar receitas por ingredite', async () => {
    renderWithRouter(<Home title="Comidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Carrots');
    userEvent.click(ingredientRadio);
    userEvent.click(btnExecSearch);

    await screen.findByText('Beef and Mustard Pie');
  });
});
describe('6 - Verifica se é exibido um alerta quando a pesquisa for inválida', () => {
  test('Pesquisar de forma incorreta deve aparecer um alerta', async () => {
    renderWithRouter(<Home title="Comidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnExecSearch).toBeInTheDocument();

    userEvent.type(searchInput, 'AB');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnExecSearch);

    expect(alert).toBeCalledWith(
      'Sua busca deve conter somente 1 (um) caracter',
    );
  });
});

describe('7 - Verifica as funcionalidades da tela de receitas de bebidas', () => {
  test('Caso uma bebida seja encontrada, deve-se ir para rota de detalhes', async () => {
    const { history } = renderWithRouter(<Home title="Bebidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'A1');
    userEvent.click(nameRadio);
    userEvent.click(btnExecSearch);

    await screen.findByText('A1');

    expect(history.location.pathname).toBe('/bebidas/17222');
  });
  test('Pesquisar de forma incorreta deve aparecer um alerta', () => {
    renderWithRouter(<Home title="Bebidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(btnExecSearch).toBeInTheDocument();

    userEvent.type(searchInput, 'Xablau');
    userEvent.click(nameRadio);
    userEvent.click(btnExecSearch);

    expect(alert).toBeCalled();
  });
});
