import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

const EMAIL_INPUT = 'email@mail.com';

describe('LoginPage.js', () => {
  test('if all the Routes are working', () => {
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>,
    );

    expect(history.location.pathname).toBe('/');
  });

  test('if initial render is the LoginPage', () => {
    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  test('if Login receive correct inputs from user', () => {
    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i }).closest('button');

    expect(buttonEnter).toBeDisabled();

    userEvent.type(emailInput, EMAIL_INPUT);
    userEvent.type(passwordInput, '1234567');

    expect(emailInput).toHaveValue(EMAIL_INPUT);
    expect(passwordInput).toHaveValue('1234567');
    expect(buttonEnter).not.toBeDisabled();
  });

  test('if localStorage is set as the enter button is clicked', () => {
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i }).closest('button');

    userEvent.type(emailInput, EMAIL_INPUT);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(buttonEnter);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    const userToken = JSON.parse(localStorage.getItem('user')).email;
    expect(userToken).toBe(EMAIL_INPUT);
  });
});
