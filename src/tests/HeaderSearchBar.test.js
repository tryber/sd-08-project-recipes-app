import React from 'react';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import HeaderSearchBar from '../components/HeaderSearchBar';

const CONTAINER_HEADER_SEARCH = 'container-header-search';
const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testes dos elemntos do compomente HeaderSearchBar', () => {
  it(`existe um botão de perfil do usuários e se clicando no botão caso exista,
   renderiza a tela de perfil`, () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRouter(<HeaderSearchBar />, history);

    expect(getByTestId(CONTAINER_HEADER_SEARCH)).toBeInTheDocument();
    expect(getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();

    fireEvent.click(getByTestId(PROFILE_TOP_BTN));
    expect(history.location.pathname).toBe('/perfil');
  });
  it(`existe um botão de search e se clicando no botão caso exista,
  renderiza as opções de esquisa por ingredientes, nome e primeira letra`, () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <HeaderSearchBar />,
    );

    expect(getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
    expect(queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
    expect(queryByTestId(INGREDIENT_SEARCH_RADIO)).not.toBeInTheDocument();
    expect(queryByTestId(NAME_SEARCH_RADIO)).not.toBeInTheDocument();
    expect(queryByTestId(FIRST_LETTER_SEARCH_RADIO)).not.toBeInTheDocument();
    expect(queryByTestId(EXEC_SEARCH_BTN)).not.toBeInTheDocument();

    fireEvent.click(getByTestId(SEARCH_TOP_BTN));

    expect(queryByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(queryByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(queryByTestId(NAME_SEARCH_RADIO)).toBeInTheDocument();
    expect(queryByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
    expect(queryByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
  });
});
