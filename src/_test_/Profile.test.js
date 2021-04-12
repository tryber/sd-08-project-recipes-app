import React from 'react';
import userEvent from '@testing-library/user-event';
import Perfil from '../Pages/Perfil';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Tests profile page', () => {
  localStorage.setItem('user', '{ "email": "email@mail.com" }');
  const EMAIL = 'profile-email';

  it('A tela de perfil tem os seguintes atributos descritos', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Perfil />);

    expect(getByTestId(EMAIL)).toBeInTheDocument();
    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it('O e-mail armazenado em localStorage está visível', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Perfil />);
    const local = JSON.parse(localStorage.getItem('user'));
    expect(getByTestId(EMAIL).innerHTML).toBe(local.email);
  });

  it('Redirecione ao clicar no botão de "Receitas Feitas"', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Perfil />);
    userEvent.click(getByTestId('profile-done-btn'));
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('Redirecione ao clicar no botão de "Receitas Favoritas"', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Perfil />);
    userEvent.click(getByTestId('profile-favorite-btn'));
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('Redirecione ao clicar no botão de "Sair"', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Perfil />);
    userEvent.click(getByTestId('profile-logout-btn'));
    expect(history.location.pathname).toBe('/');
  });

  it('Caso não tenha nada no localStorage, apresenta "No email found!"', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Perfil />);
    localStorage.clear();

    expect(getByTestId(EMAIL).innerHTML).toBe('No email found!');
  });
});
