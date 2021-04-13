import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Perfil from '../pages/PerfilPágina';

describe('Profile Page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({ email: 'hugostoso@bol.com.br' })),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test('82 - Implemente os elementos da a tela de perfil respeitando os atributos descritos no protótipo', async () => {
    const { findByTestId } = render(<Perfil />);
    const profileEmail = await findByTestId('profile-email');
    const profileDoneBtn = await findByTestId('profile-done-btn');
    const profileFavoriteBtn = await findByTestId('profile-favorite-btn');
    const profileLogoutBtn = await findByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  test('83 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível', async () => {
    const { findByText } = render(<Perfil />);
    const email = await findByText('hugostoso@bol.com.br');

    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(email).toBeInTheDocument();
  });

  test('84 - Implemente 3 botões: um de nome "Receitas Feitas", um de nome "Receitas Favoritas" e um de nome "Sair"', async () => {
    const { findByRole } = render(<Perfil />);
    const doneRecipesBtn = await findByRole('button', { name: 'Receitas Feitas' });
    const favoriteRecipesBtn = await findByRole('button', { name: 'Receitas Favoritas' });
    const exitBtn = await findByRole('button', { name: 'Sair' });

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(exitBtn).toBeInTheDocument();
  });

  test('85 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Favoritas", a rota deve mudar para a tela de receitas favoritas', async () => {
    const history = createBrowserHistory();
    const { findByRole } = render(
      <Router initialEntries={ ['/perfil'] } history={ history }>
        <Perfil />
      </Router>,
    );
    const favoriteRecipesBtn = await findByRole('button', { name: 'Receitas Favoritas' });
    userEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  test('86 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Feitas", a rota deve mudar para a tela de receitas feitas', async () => {
    const history = createBrowserHistory();
    const { findByRole } = render(
      <Router initialEntries={ ['/perfil'] } history={ history }>
        <Perfil />
      </Router>,
    );
    const doneRecipesBtn = await findByRole('button', { name: 'Receitas Feitas' });
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  test('87 - Redirecione a pessoa usuária que, ao clicar no botão de "Sair", o localStorage deve ser limpo e a rota deve mudar para a tela de login', async () => {
    const history = createBrowserHistory();
    const { findByRole } = render(
      <Router initialEntries={ ['/perfil'] } history={ history }>
        <Perfil />
      </Router>,
    );
    const exitBtn = await findByRole('button', { name: 'Sair' });
    userEvent.click(exitBtn);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/');
  });
});
