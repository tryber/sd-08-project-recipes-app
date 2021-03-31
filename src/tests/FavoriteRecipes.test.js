import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const PAGE_TITLE = 'page-title';
const CONTAINER_HEADER_SIMPLE = 'container-header-simple';
const PROFILE_TOP_BTN = 'profile-top-btn';

describe('Testes dos elemntos da tela de receitas favoritas', () => {
  it('existe um cabeçalho no componente', () => {
    const history = createMemoryHistory();
    const path = '/receitas-favoritas';
    history.push(path);
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />, history);

    expect(getByTestId(CONTAINER_HEADER_SIMPLE)).toBeInTheDocument();
  });
  it('existe todos data-testId\'s no cabeçalhos', () => {
    const history = createMemoryHistory();
    const path = '/receitas-favoritas';
    history.push(path);
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />, history);

    expect(getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(getByTestId(PAGE_TITLE)).toBeInTheDocument();
  });
});
