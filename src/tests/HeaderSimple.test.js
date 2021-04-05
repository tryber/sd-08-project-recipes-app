import React from 'react';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import HeaderSimple from '../components/HeaderSimple';

const CONTAINER_HEADER_SIMPLE = 'container-header-simple';
const PROFILE_TOP_BTN = 'profile-top-btn';
const PAGE_TITLE = 'page-title';

describe('Testes dos elementos do compomente HeaderSimple', () => {
  it(`existe um botão de perfil do usuários e título da pagina;
    e se clicando no botão caso exista,
   renderiza a tela de perfil`, () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRouter(<HeaderSimple />, history);

    expect(getByTestId(CONTAINER_HEADER_SIMPLE)).toBeInTheDocument();
    expect(getByTestId(PAGE_TITLE)).toBeInTheDocument();
    expect(getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();

    fireEvent.click(getByTestId(PROFILE_TOP_BTN));
    expect(history.location.pathname).toBe('/perfil');
  });
});
