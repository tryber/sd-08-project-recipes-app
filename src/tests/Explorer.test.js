import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import Explorer from '../pages/Explorer/Explorer';
import userEvent from '@testing-library/user-event';

describe('1 - Verifica os elementos presentes na tela explorar', () => {
  test('Verifica se o título está presente e contém o texto "Explorar"', () => {
    const { getByTestId } = renderWithRouter(
      <Explorer title="Explorar" visible={false} />,
    );
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Explorar');
  });
  test('Os botões explorar comidas e bebidas estão presentes', () => {
    const { getByText } = renderWithRouter(
      <Explorer title="Explorar" visible={false} />,
    );
    const btnExplorarComidas = getByText(/explorar comidas/i);
    const btnExplorarBebidas = getByText(/explorar bebidas/i);
    expect(btnExplorarComidas).toBeInTheDocument();
    expect(btnExplorarBebidas).toBeInTheDocument();
  });
});
describe('2 - Verifica se os botões redirecionam para a rota corretamente', () => {
  test('Verifica se botão "Explorar Comidas" redireciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(
      <Explorer title="Explorar" visible={false} />,
    );
    const btnExplorarComidas = getByTestId('explore-food');
    userEvent.click(btnExplorarComidas);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });
  test('Verifica se botão "Explorar Bebidas" redireciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(
      <Explorer title="Explorar" visible={false} />,
    );
    const btnExplorarBebidas = getByTestId('explore-drinks');
    userEvent.click(btnExplorarBebidas);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
