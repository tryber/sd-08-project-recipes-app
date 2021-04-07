import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Tests login page', () => {
  it('Botão de entrar e redirecionamento', () => {
    const {
      history,
      getByText,
      getByLabelText,
      getByRole,
    } = renderWithRouterAndRedux(<App />);

    expect(getByText(/trybe/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /entrar/i })).toBeDisabled();

    userEvent.type(getByLabelText(/email/i), 'user1@email.com');
    userEvent.type(getByLabelText(/senha/i), '12345678');
    expect(getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    userEvent.click(getByRole('button', { name: /entrar/i }));
    expect(history.location.pathname).toBe('/comidas');
  });

  it('O botão entrar deve estar desativado se a senha for menor que 6', () => {
    const {
      getByLabelText,
      getByRole,
    } = renderWithRouterAndRedux(<App />);

    expect(getByRole('button', { name: /entrar/i })).toBeDisabled();
    userEvent.type(getByLabelText(/email/i), 'user2@email.com');
    userEvent.type(getByLabelText(/senha/i), '1234');
    expect(getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('Salve 2 tokens no localStorage, mealsToken e cocktailsToken', () => {
    const {
      getByLabelText,
      getByRole,
    } = renderWithRouterAndRedux(<App />);
    localStorage.clear();

    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);

    userEvent.type(getByLabelText(/email/i), 'user3@email.com');
    userEvent.type(getByLabelText(/senha/i), '12345678');
    expect(getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    userEvent.click(getByRole('button', { name: /entrar/i }));
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });

  it('Salve o e-mail da pessoa usuária no localStorage', () => {
    const {
      getByLabelText,
      getByRole,
    } = renderWithRouterAndRedux(<App />);
    localStorage.clear();

    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(getByLabelText(/email/i), 'email@mail.com');
    userEvent.type(getByLabelText(/senha/i), '12345678');
    expect(getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    userEvent.click(getByRole('button', { name: /entrar/i }));
    expect(JSON.parse(localStorage.getItem('user')))
      .toStrictEqual({ email: 'email@mail.com' });
  });
});
