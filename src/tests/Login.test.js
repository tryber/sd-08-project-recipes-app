import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

describe('Testes dos elemntos da tela de login', () => {
  it('existe um campo para inserir email', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId(EMAIL_INPUT)).toBeInTheDocument();
  });
  it('existe um campo para inserir senha', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
  });

  it('botão de entrar está desativado se o email e a senha forem inválidos', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveAttribute('disabled');
  });

  it('o botão de entrar está desativado se apenas o email foi preenchido', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const emailInput = getByTestId(EMAIL_INPUT);
    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveAttribute('disabled');
  });

  it('o botão de entrar está desativado se apenas a senha foi preenchida', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const passwordInput = getByTestId(PASSWORD_INPUT);
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveAttribute('disabled');
  });

  it('O botão de entrar estar ativado se o email e a senha forem preenchidos e válidos',
    () => {
      const { getByTestId } = renderWithRouter(<App />);
      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
      fireEvent.change(passwordInput, { target: { value: '1234567' } });

      expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveProperty('disabled', false);
    });
});
