import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Explore from '../Pages/Explorar';

describe('<Explorar />', () => {
  it('Verifica se a tela explorar contem 2 botões', () => {
    renderWithRouterAndRedux(<Explore />);

    const buttonFood = screen.getByTestId('explore-food');
    const buttonDrink = screen.getByTestId('explore-drinks');

    expect(buttonFood).toBeInTheDocument();
    expect(buttonDrink).toBeInTheDocument();
  });

  it('Verifica o click do botão de comida', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);

    const buttonFood = screen.getByTestId('explore-food');
    userEvent.click(buttonFood);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Verifica o click do botão de bebida', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);

    const buttonDrink = screen.getByTestId('explore-drinks');
    userEvent.click(buttonDrink);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
