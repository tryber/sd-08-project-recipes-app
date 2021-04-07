import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/Header';

const SEARCH_BTN = 'search-top-btn';
const PROFILE_ICON = 'Profile Icon';
const SEARCH_ICON = 'Search Icon';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const EXEC_BTN = 'exec-search-btn';

describe('Teste do componente header', () => {
  it('Se o Header tem os itens esperados', () => {
    renderWithRouter(<Header />);
    const headerTitle = screen.getByRole('heading', { name: '' });
    expect(headerTitle).toBeInTheDocument();
    const perfilBotao = screen.getByRole('button', { name: PROFILE_ICON });
    expect(perfilBotao).toBeInTheDocument();
    const buscarBotao = screen.getByRole('button', { name: SEARCH_ICON });
    expect(buscarBotao).toBeInTheDocument();
  });

  it('Se o botão de profile leva pra outra página', () => {
    const { history } = renderWithRouter(<Header />);
    const perfilBotao = screen.getByRole('button', { name: PROFILE_ICON });
    userEvent.click(perfilBotao);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Se o botão de buscar funciona corretamente', () => {
    renderWithRouter(<Header />);

    expect(screen.queryByTestId(SEARCH_INPUT)).toBe(null);

    const buscarBotao = screen.getByRole('button', { name: SEARCH_ICON });
    userEvent.click(buscarBotao);
    expect(screen.queryByTestId(SEARCH_INPUT)).toBeInTheDocument();
  });

  it('Se os elementos do search estão presentes', () => {
    renderWithRouter(<Header />);

    const perfilBotao = screen.queryByTestId(SEARCH_BTN);
    userEvent.click(perfilBotao);

    const searchInput = screen.queryByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Corba');
    const ingredientRadio = screen.queryByTestId(INGREDIENT_RADIO);
    userEvent.click(ingredientRadio);

    const firstLetterRaio = screen.queryByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRaio);

    const nameRadio = screen.queryByTestId(NAME_RADIO);
    userEvent.click(nameRadio);

    const execBtn = screen.queryByTestId(EXEC_BTN);
    userEvent.click(execBtn);

    const buscarBotao = screen.getByRole('textbox', { value: 'Corba' });
    expect(buscarBotao).toBeInTheDocument();
  });
});
