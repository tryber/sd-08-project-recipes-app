import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const EMAIL = 'user1@email.com';

describe('Tests login page', () => {
  it('Botão de entrar e redirecionamento', () => {
    const {
      history,
      getByText,
      getByRole,
      getByTestId,
    } = renderWithRouterAndRedux(<Login />, {
      initialEntries: ['/'],
    });

    expect(getByText(/trybe/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /entrar/i })).toBeDisabled();

    userEvent.type(getByTestId(EMAIL_ID), EMAIL);
    userEvent.type(getByTestId(PASSWORD_ID), '12345678');
    expect(getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    userEvent.click(getByRole('button', { name: /entrar/i }));
    expect(history.location.pathname).toBe('/comidas');
  });

  it('O botão entrar deve estar desativado se a senha for menor que 6', () => {
    const {
      getByTestId,
      getByRole,
    } = renderWithRouterAndRedux(<Login />);

    expect(getByRole('button', { name: /entrar/i })).toBeDisabled();
    userEvent.type(getByTestId(EMAIL_ID), EMAIL);
    userEvent.type(getByTestId(PASSWORD_ID), '1234');
    expect(getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('Salve 2 tokens no localStorage, mealsToken e cocktailsToken', () => {
    const {
      getByTestId,
      getByRole,
    } = renderWithRouterAndRedux(<Login />);
    localStorage.clear();

    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);

    userEvent.type(getByTestId(EMAIL_ID), EMAIL);
    userEvent.type(getByTestId(PASSWORD_ID), '12345678');
    expect(getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    userEvent.click(getByRole('button', { name: /entrar/i }));
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });

  it('Salve o e-mail da pessoa usuária no localStorage', () => {
    const {
      getByTestId,
      getByRole,
    } = renderWithRouterAndRedux(<Login />);
    localStorage.clear();

    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(getByTestId(EMAIL_ID), 'email@mail.com');
    userEvent.type(getByTestId(PASSWORD_ID), '12345678');
    expect(getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    userEvent.click(getByRole('button', { name: /entrar/i }));
    expect(JSON.parse(localStorage.getItem('user')))
      .toStrictEqual({ email: 'email@mail.com' });
  });
});
