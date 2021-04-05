import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import ToExplore from '../pages/ToExplore';

const PAGE_TITLE = 'page-title';
const CONTAINER_HEADER_SIMPLE = 'container-header-simple';
const FOOTER = 'footer';
const PROFILE_TOP_BTN = 'profile-top-btn';

describe('Testes dos elementos da tela de explorar', () => {
  it('existe um cabeçalho e um footer no componente', () => {
    const history = createMemoryHistory();
    const path = '/explorar';
    history.push(path);
    const { getByTestId } = renderWithRouter(<ToExplore />, history);

    expect(getByTestId(CONTAINER_HEADER_SIMPLE)).toBeInTheDocument();
    expect(getByTestId(FOOTER)).toBeInTheDocument();
  });
  it('existe todos data-testId\'s no cabeçalhos', () => {
    const history = createMemoryHistory();
    const path = '/explorar';
    history.push(path);
    const { getByTestId } = renderWithRouter(<ToExplore />, history);

    expect(getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(getByTestId(PAGE_TITLE)).toBeInTheDocument();
  });
});
