import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ExplorarComidasEBebidas from '../pages/ExplorarComidasEBebidas';

const PAGINA_TESTE_COMIDA = '/explorar/comidas';
const PAGINA_TESTE_BEBIDA = '/explorar/bebidas';

describe('Teste o componente Explorar Comidas e Bebidas', () => {
  it('Existem 7 botões na tela', () => {
    renderWithRouter(<ExplorarComidasEBebidas />, [PAGINA_TESTE_COMIDA]);
    const buttonsOnScreen = 7;

    const botões = screen.getAllByRole('button');
    expect(botões).toHaveLength(buttonsOnScreen);
  });

  it('Testar Botão de ingredientes', () => {
    const { history } = renderWithRouter(
      <ExplorarComidasEBebidas />,
      [PAGINA_TESTE_COMIDA],
    );

    const botãoIngredientes = screen.getByText('Por Ingredientes');
    userEvent.click(botãoIngredientes);

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Testar Botão de origem', () => {
    const { history } = renderWithRouter(
      <ExplorarComidasEBebidas />,
      [PAGINA_TESTE_COMIDA],
    );

    const botãoOrigem = screen.getByText('Por Local de Origem');
    userEvent.click(botãoOrigem);

    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  it('Testar Botão Surpreenda', () => {
    const { history } = renderWithRouter(
      <ExplorarComidasEBebidas />,
      [PAGINA_TESTE_COMIDA],
    );

    const botãoSurpreenda = screen.getByText('Me Surpreenda!');
    userEvent.click(botãoSurpreenda);

    expect(history.location.pathname).not.toBe(PAGINA_TESTE_COMIDA);
  });

  it('Existem 6 botões na tela', () => {
    renderWithRouter(
      <ExplorarComidasEBebidas />,
      [PAGINA_TESTE_BEBIDA],
    );
    const buttonsOnScreen = 6;

    const botões = screen.getAllByRole('button');
    expect(botões).toHaveLength(buttonsOnScreen);
  });

  it('Testar Botão de origem', () => {
    const { history } = renderWithRouter(
      <ExplorarComidasEBebidas />,
      [PAGINA_TESTE_BEBIDA],
    );

    const botãoIngredientes = screen.getByText('Por Ingredientes');
    userEvent.click(botãoIngredientes);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });
});
