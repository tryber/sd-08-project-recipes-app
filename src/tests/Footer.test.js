import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';

const BEBIDAS_BTN = 'drinks-bottom-btn';
const EXPLORAR_BTN = 'explore-bottom-btn';
const COMIDAS_BTN = 'food-bottom-btn';

describe('Teste do componente Footer', () => {
  it('Se o Footer tem os itens esperados', () => {
    renderWithRouter(<Footer />);
    const bebidasFooter = screen.getByTestId(BEBIDAS_BTN);
    expect(bebidasFooter).toBeInTheDocument();
    const explorarFooter = screen.getByTestId(EXPLORAR_BTN);
    expect(explorarFooter).toBeInTheDocument();
    const comidasFooter = screen.getByTestId(COMIDAS_BTN);
    expect(comidasFooter).toBeInTheDocument();
  });

  it('Se o botão de bebidas leva pra outra página', () => {
    const { history } = renderWithRouter(<Footer />);
    const bebidasFooter = screen.getByTestId(BEBIDAS_BTN);
    userEvent.click(bebidasFooter);
    expect(history.location.pathname).toBe('/bebidas');
  });

  it('Se o botão de explorar leva pra outra página', () => {
    const { history } = renderWithRouter(<Footer />);
    const explorarFooter = screen.getByTestId(EXPLORAR_BTN);
    userEvent.click(explorarFooter);
    expect(history.location.pathname).toBe('/explorar');
  });

  it('Se o botão de comidas leva pra outra página', () => {
    const { history } = renderWithRouter(<Footer />);
    const comidasFooter = screen.getByTestId(COMIDAS_BTN);
    userEvent.click(comidasFooter);
    expect(history.location.pathname).toBe('/comidas');
  });
});
