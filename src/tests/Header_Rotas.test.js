import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const PAGE_TITLE = 'page-title';
const PROFILE_BTN = 'profile-top-btn';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Teste se os componentes tem o Header correto', () => {
  const hasNoHeader = () => {
    expect(screen.queryByTestId(PAGE_TITLE)).toBe(null);
    expect(screen.queryByTestId(PROFILE_BTN)).toBe(null);
    expect(screen.queryByTestId(SEARCH_BTN)).toBe(null);
  };

  const hasHeader = (title, withSearchButton = true) => {
    const headerTitle = screen.getByRole('heading', { name: title });
    expect(headerTitle).toBeInTheDocument();
    const perfilBotao = screen.getByRole('button', { name: 'Profile Icon' });
    expect(perfilBotao).toBeInTheDocument();
    if (withSearchButton) {
      const buscarBotao = screen.getByRole('button', { name: 'Search Icon' });
      expect(buscarBotao).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId(SEARCH_INPUT)).toBe(null);
    }
  };

  it('Se a tela de login não tem Header', () => {
    renderWithRouter(<App />);

    hasNoHeader();
  });

  it('Se a tela de comidas tem Header e as informações corretas', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/comidas'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Comidas');
  });

  it('Se a tela de bebidas tem Header e as informações corretas', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/bebidas'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Bebidas');
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/comidas/52771'] }>
        <App />
      </MemoryRouter>,
    );

    hasNoHeader();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/bebidas/178319'] }>
        <App />
      </MemoryRouter>,
    );

    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de comida', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/comidas/52771/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de bebida', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/bebidas/178319/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    hasNoHeader();
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/explorar'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Explorar', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/explorar/comidas'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Explorar Comidas', false);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/explorar/bebidas'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Explorar Bebidas', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas por ingredient', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/explorar/comidas/ingredientes'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Explorar Ingredientes', false);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas por ingredient', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/explorar/bebidas/ingredientes'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Explorar Ingredientes', false);
  });

  it(`O header tem os ícones corretos na tela de
    explorar comidas por local de origem`, () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/explorar/comidas/area'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Explorar Origem');
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/perfil'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Perfil', false);
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/receitas-feitas'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Receitas Feitas', false);
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/receitas-favoritas'] }>
        <App />
      </MemoryRouter>,
    );

    hasHeader('Receitas Favoritas', false);
  });
});

describe('Redirecione a pessoa usuária corretamente', () => {
  it('A mudança de tela ocorre ao clicar na imagem do Perfil', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/comidas'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(PAGE_TITLE).innerHTML).toBe('Comidas');
    const perfilBotao = screen.queryByTestId(PROFILE_BTN);
    userEvent.click(perfilBotao);

    expect(screen.queryByTestId(PAGE_TITLE).innerHTML).toBe('Perfil');
  });
});

describe(`Desenvolva o botão de busca que, ao ser clicado,
  a barra de busca deve aparecer. O mesmo serve para escondê-la`, () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/comidas'] }>
        <App />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId(SEARCH_INPUT)).toBe(null);

    const perfilBotao = screen.queryByTestId(SEARCH_BTN);
    userEvent.click(perfilBotao);

    expect(screen.queryByTestId(SEARCH_INPUT)).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/comidas'] }>
        <App />
      </MemoryRouter>,
    );

    const perfilBotao = screen.queryByTestId(SEARCH_BTN);
    userEvent.click(perfilBotao);
    expect(screen.queryByTestId(SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(perfilBotao);
    expect(screen.queryByTestId(SEARCH_INPUT)).toBe(null);
  });
});
