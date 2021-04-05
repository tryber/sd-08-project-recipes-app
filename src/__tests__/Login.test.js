import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../routes/renderWithRouter';

import Login from '../pages/Login';

const setup = () => {
  const utils = renderWithRouter(<Login />);
  const img = utils.getByRole('img');
  const emailInput = utils.getByTestId('email-input');
  const passwordInput = utils.getByTestId('password-input');
  const buttonLogin = utils.getByTestId('login-submit-btn');
  const email = 'rafaelcostamoura@gmail.com';
  const emailInvalid = 'rafaelcostamoura@gmailcom';
  const password = '1234567';
  const passwordInvalid = '12567';

  return {
    img,
    emailInput,
    buttonLogin,
    email,
    emailInvalid,
    password,
    passwordInvalid,
    passwordInput,
    ...utils,
  };
};

describe('Testing page Login', () => {
  it('should Login Image', () => {
    const { img } = setup();
    expect(img.className).toBe('login-img-logo');
  });

  it('should Exist Text Digite seu email:', () => {
    const { emailInput } = setup();
    expect(emailInput.previousSibling.textContent).toBe('Digite seu email:');
  });

  it('should Exist Input Email', () => {
    const { emailInput } = setup();
    expect(emailInput).toBeInTheDocument();
  });

  it('should Exist Text Digite sua Senha:', () => {
    const { passwordInput } = setup();
    expect(passwordInput.previousSibling.textContent).toBe('Digite sua Senha:');
  });

  it('should Exist Input Password', () => {
    const { passwordInput } = setup();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should Exist Button Login', () => {
    const { buttonLogin } = setup();
    expect(buttonLogin).toBeInTheDocument();
  });

  it('should Text Button Login to equal Entrar', () => {
    const { buttonLogin } = setup();
    expect(buttonLogin.textContent).toBe('Entrar');
  });
});

describe('Tests functionality and routes', () => {
  it('should verify if Button is Disable before Login', () => {
    const { buttonLogin } = setup();
    expect(buttonLogin).toBeDisabled();
  });

  it('if you type just the email, the button must be deactivated', () => {
    const { buttonLogin, emailInput, email } = setup();
    fireEvent.change(emailInput, { target: { value: email } });
    expect(buttonLogin).toBeDisabled();
  });

  it('Should fail if the email is invalid', () => {
    const { buttonLogin, emailInput, emailInvalid, password, passwordInput } = setup();
    fireEvent.change(emailInput, { target: { value: emailInvalid } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(buttonLogin).toBeDisabled();
  });

  it('should type email and password Button to Enabled', () => {
    const { buttonLogin, emailInput, passwordInput, email, password } = setup();
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(buttonLogin).toBeEnabled();
  });

  it('if you type just the password, the button must be deactivated', () => {
    const { buttonLogin, passwordInput, password } = setup();
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(buttonLogin).toBeDisabled();
  });

  it('Should fail if the password is invalid', () => {
    const { buttonLogin, emailInput, email, passwordInput, passwordInvalid } = setup();
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: passwordInvalid } });
    expect(buttonLogin).toBeDisabled();
  });

  it('should change route on Click Button Login', () => {
    const { buttonLogin, emailInput, passwordInput, email, password, history } = setup();
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/comidas');
  });
});
