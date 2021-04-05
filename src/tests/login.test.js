import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import Login from '../Pages/Login';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login.js', () => {
  test('Testa se há os inputs necessários para login', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const login = getByTestId('email-input');
    expect(login).toBeInTheDocument();
    const password = getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });
  test('Testa as ações do usuário', async () => {
    const { getByTestId, getByRole, history } = renderWithRouter(<App />);

    // const { pathname } = history.location;
    const login = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByRole('button', { name: /Entrar/ });
    expect(button).toBeDisabled();
    fireEvent.change(login, { target: { value: 'email@email.com' } });
    expect(login).toHaveValue('email@email.com');
    fireEvent.change(password, { target: { value: 'password' } });
    expect(password).toHaveValue('password');
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/comidas');
  });
});
