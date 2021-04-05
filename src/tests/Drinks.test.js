import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import Drinks from '../pages/Drinks';

const PAGE_TITLE = 'page-title';
const CONTAINER_HEADER_SEARCH = 'container-header-search';
const FOOTER = 'footer';
const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';

describe('Testes dos elemntos da tela de bebidas', () => {
  it('existe um cabeçalho e um footer no componente', () => {
    const history = createMemoryHistory();
    // const path = '/bebidas';
    // history.push(path);
    const { getByTestId } = renderWithRouter(<Drinks />, history);

    expect(getByTestId(CONTAINER_HEADER_SEARCH)).toBeInTheDocument();
    expect(getByTestId(FOOTER)).toBeInTheDocument();
  });
  it('existe todos data-testId\'s no cabeçalhos', () => {
    const history = createMemoryHistory();
    const path = '/bebidas';
    history.push(path);
    const { getByTestId } = renderWithRouter(<Drinks />, history);

    expect(getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(getByTestId(PAGE_TITLE)).toBeInTheDocument();
    expect(getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
  });
});
