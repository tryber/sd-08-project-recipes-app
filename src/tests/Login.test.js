import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Component Login', () => {
  test('there is email input element', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('there is password input element', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('there is login submit btn element', () => {
    renderWithRouter(<Login />);

    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    expect(loginSubmitBtn).toBeInTheDocument();
  });

  test('redirect for foods', () => {
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(enterBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
