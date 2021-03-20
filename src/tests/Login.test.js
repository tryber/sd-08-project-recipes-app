import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

const testEmail = 'email@email.com';
const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginSubmitBtn = 'login-submit-btn';

const mealsTokenMock = { mealsToken: '1' };
const cocktailsTokenMock = { cocktailsToken: '1' };
const userEmailMock = { user: { email: testEmail } };

afterEach(() => {
  window.localStorage.removeItem('mealsToken');
  window.localStorage.removeItem('cocktailsToken');
});
afterEach(() => jest.clearAllMocks());

describe('Página inicial de login', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Local para inserir E-mail, senha e botão entrar', () => {
    renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submit = screen.getByTestId(loginSubmitBtn);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  test('Verifica campos e-mail, senha e botão entrar', () => {
    renderWithRouterAndStore(<App />);
    const submit = screen.getByTestId(loginSubmitBtn);
    expect(submit).toBeDisabled();

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);

    userEvent.type(email, 'email');
    userEvent.type(password, '123456');
    expect(submit).toBeDisabled();

    userEvent.type(email, 'email@email.');
    userEvent.type(password, '123456');
    expect(submit).toBeDisabled();

    userEvent.type(email, 'email@mail.com');
    userEvent.type(password, '1234567');
    expect(submit).toBeEnabled();

    userEvent.type(email, 'email@email');
    userEvent.type(password, '123456');
    expect(submit).toBeDisabled();

    userEvent.type(email, testEmail);
    userEvent.type(password, '12345');
    expect(submit).toBeDisabled();

    userEvent.type(email, 'email.email@com');
    userEvent.type(password, '123456');
    expect(submit).toBeDisabled();

    userEvent.type(email, 'email@email@');
    userEvent.type(password, '123456');
    expect(submit).toBeDisabled();
  });

  test('Salve 2 tokens e email do usuário no localStorage após a submissão', () => {
    renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submit = screen.getByTestId(loginSubmitBtn);

    userEvent.type(email, testEmail);
    userEvent.type(password, '123456');
    fireEvent.click(submit);

    expect(window
      .localStorage.getItem('cocktailsToken')).toEqual(cocktailsTokenMock.cocktailsToken);
    expect(window.localStorage.getItem('mealsToken')).toEqual(mealsTokenMock.mealsToken);
    expect(window.localStorage.getItem('user: email')).toEqual(userEmailMock.user.email);
  });

  test('Redirecione o usuário para \'/comidas\' após a validação do login', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submit = screen.getByTestId(loginSubmitBtn);

    userEvent.type(email, testEmail);
    userEvent.type(password, '123456');
    fireEvent.click(submit);

    expect(history.location.pathname).toBe('/comidas');
  });
});
