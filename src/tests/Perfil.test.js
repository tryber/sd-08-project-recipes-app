import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../renderWithRouter';
import ComponentPerfil from '../components/ComponentPerfil';
import Perfil from '../pages/Perfil';

const emailDefault = 'name@email.com';
const emailDeTeste = 'teste@gmail.com';
const stringFeitas = 'Receitas Feitas';
const stringFavoritas = 'Receitas Favoritas';
const stringSair = 'Sair';

describe('Testando a Tela de Perfil', () => {
  it('Testando se mostra o e-mail default se for direto pra /perfil', () => {
    RenderWithRouter(<ComponentPerfil />);

    expect(screen.getByRole('heading', { level: 1, name: emailDefault }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: emailDefault }).textContent)
      .toBe(emailDefault);
  });

  it('Testando se a página contém o e-mail passado em Login', () => {
    localStorage.setItem('user', JSON.stringify({ email: emailDeTeste }));
    RenderWithRouter(<ComponentPerfil />);

    expect(screen.getByRole('heading', { level: 1, name: emailDeTeste }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: emailDeTeste }).textContent)
      .toBe(emailDeTeste);
  });

  it('Testando se o botão Receitas Feitas existe e se vai pra /receitas-feitas', () => {
    const { history } = RenderWithRouter(<ComponentPerfil />);

    expect(screen.getByRole('button', { name: stringFeitas })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: stringFeitas }).textContent)
      .toBe(stringFeitas);

    userEvent.click(screen.getByRole('button', { name: stringFeitas }));
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('Se o botão Receitas Favoritas existe e se vai pra /receitas-favoritas', () => {
    const { history } = RenderWithRouter(<ComponentPerfil />);

    expect(screen.getByRole('button', { name: stringFavoritas })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: stringFavoritas }).textContent)
      .toBe(stringFavoritas);

    userEvent.click(screen.getByRole('button', { name: stringFavoritas }));
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('Se o botão Sair existe e se volta pra Home ("/")', () => {
    const { history } = RenderWithRouter(<ComponentPerfil />);

    expect(screen.getByRole('button', { name: stringSair })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: stringSair }).textContent)
      .toBe(stringSair);

    userEvent.click(screen.getByRole('button', { name: stringSair }));
    expect(history.location.pathname).toBe('/');
  });

  it('Testando Perfil.js', () => {
    const { history } = RenderWithRouter(<Perfil />);

    expect(history.location.pathname).toBe('/');
  });
});
