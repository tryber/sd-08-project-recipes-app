import React from 'react';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import Footer from '../components/Footer';

const FOOTER = 'footer';
const DRINKS_BOTTON_BTN = 'drinks-bottom-btn';
const EXPLORE_BOTTON_BTN = 'explore-bottom-btn';
const FOOD_BOTTON_BTN = 'food-bottom-btn';

describe('Testes dos elementos do componente Footer', () => {
  it('existe todos os data-testid\'s no componente', () => {
    const { getByTestId } = renderWithRouter(<Footer />);

    expect(getByTestId(FOOTER)).toBeInTheDocument();
    expect(getByTestId(DRINKS_BOTTON_BTN)).toBeInTheDocument();
    expect(getByTestId(EXPLORE_BOTTON_BTN)).toBeInTheDocument();
    expect(getByTestId(FOOD_BOTTON_BTN)).toBeInTheDocument();
  });

  it(`Testa o redirecionamento para as 
      páginas corretas dos botões no footer`, () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRouter(
      <Footer />,
      history,
    );

    fireEvent.click(getByTestId(DRINKS_BOTTON_BTN));
    expect(history.location.pathname).toBe('/bebidas');

    fireEvent.click(getByTestId(EXPLORE_BOTTON_BTN));
    expect(history.location.pathname).toBe('/explorar');

    fireEvent.click(getByTestId(FOOD_BOTTON_BTN));
    expect(history.location.pathname).toBe('/comidas');
  });
});
