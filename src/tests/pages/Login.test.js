import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import Login from '../../pages/Login';

const testIds = {
  emailInput: 'email-input',
  passwordInput: 'password-input',
  loginSubmitButton: 'login-submit-btn',
};

const VALID_EMAIL = 'email@email.com';
const INVALID_EMAIL = 'INVALIDEMAIL';
const VALID_PASSWORD = '123123123';
const INVALID_PASSWORD = '123';

describe('Login', () => {
  test('Existe um campo de email', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);
    expect(getByTestId(testIds.emailInput)).toBeInTheDocument();
  });

  test('Existe um campo de senha', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);
    expect(getByTestId(testIds.passwordInput)).toBeInTheDocument();
  });

  test('Existe um botão de login', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);
    expect(getByTestId(testIds.loginSubmitButton)).toBeInTheDocument();
  });

  test(`Se o email e a senha não estiverem preenchidos,
  o botão fica desabilitado`, () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);
    const button = getByTestId(testIds.loginSubmitButton);
    expect(button).toBeDisabled();
  });

  test(`Se o email estiver correto porém a senha estiver errada,
  o botão continua desabilitado`, () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);

    const button = getByTestId(testIds.loginSubmitButton);
    expect(button).toBeDisabled();

    const inputEmail = getByTestId(testIds.emailInput);
    const inputPassword = getByTestId(testIds.passwordInput);

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, INVALID_PASSWORD);

    expect(button).toBeDisabled();
  });

  test(`Se a senha estiver correta porém o email estiver errado,
  o botão continua desabilitado`, () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);

    const button = getByTestId(testIds.loginSubmitButton);
    expect(button).toBeDisabled();

    const inputEmail = getByTestId(testIds.emailInput);
    const inputPassword = getByTestId(testIds.passwordInput);

    userEvent.type(inputEmail, INVALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);

    expect(button).toBeDisabled();
  });

  test('Se o email e a senha estiverem corretos, o botão é habilitado', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Login />);

    const button = getByTestId(testIds.loginSubmitButton);
    expect(button).toBeDisabled();

    const inputEmail = getByTestId(testIds.emailInput);
    const inputPassword = getByTestId(testIds.passwordInput);

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);

    expect(button).not.toBeDisabled();
  });

  test.only('Ao fazer login é redirecionado para rota /comidas', () => {
    const { getByTestId, history } = renderWithStoreAndRouter(<Login />);
    const button = getByTestId(testIds.loginSubmitButton);
    const inputEmail = getByTestId(testIds.emailInput);
    const inputPassword = getByTestId(testIds.passwordInput);
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/comidas');
  });
});
