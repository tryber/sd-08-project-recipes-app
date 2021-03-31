import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import DetailsMeal from '../pages/DetailsMeal';

const CONTAINER_HEADER_SEARCH = 'container-header-search';
const CONTAINER_HEADER_SIMPLE = 'container-header-simple';

describe('Testes dos elemntos da tela de detalhes de uma comida', () => {
  it('existe um cabeçalho no componente', () => {
    const history = createMemoryHistory();
    const path = '/comidas/52885';
    history.push(path);
    renderWithRouter(<DetailsMeal />, history);

    expect(screen.queryByTestId(CONTAINER_HEADER_SEARCH)).not.toBeInTheDocument();
    expect(screen.queryByTestId(CONTAINER_HEADER_SIMPLE)).not.toBeInTheDocument();
  });
});
