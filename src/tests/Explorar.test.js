import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../renderWithRouter';
import ComponentExplorar from '../components/ComponentExplorar';

const strEC = /explorar comidas/i;
const strEB = /explorar bebidas/i;

describe('Testando a Tela de Perfil', () => {
  it('Testando se exite um botão Explorar Comidas com o texto Explorar Comidas', () => {
    RenderWithRouter(<ComponentExplorar />);

    expect(screen.getByText(strEC)).toBeInTheDocument();
    expect(screen.getByText(strEC).textContent).toBe('Explorar Comidas');
  });

  it('Testando se ao clicar no botão Explorar Comidas vai para /explorar/comidas', () => {
    const { history } = RenderWithRouter(<ComponentExplorar />);

    const botaoEC = screen.getByText(strEC);
    userEvent.click(botaoEC);
    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  it('Testando se exite um botão Explorar Bebidas com o texto Explorar Bebidas', () => {
    RenderWithRouter(<ComponentExplorar />);

    expect(screen.getByText(strEB)).toBeInTheDocument();
    expect(screen.getByText(strEB).textContent).toBe('Explorar Bebidas');
  });

  it('Testando se ao clicar no botão Explorar Comidas vai para /explorar/bebidas', () => {
    const { history } = RenderWithRouter(<ComponentExplorar />);

    const botaoEC = screen.getByText(strEB);
    userEvent.click(botaoEC);
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
