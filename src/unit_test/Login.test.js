import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const EMAIL_IMPUT = 'email-input';
const PASSWORD_IMPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

describe('Tela de Login', () => {
  it('Página principal é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O botão deve estar desabilitado se e-mail ou senha for inválido', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const email = getByTestId(EMAIL_IMPUT);
    const button = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(email, { target: { value: 'email' } });
    expect(button).toHaveAttribute('disabled');

    const password = getByTestId(PASSWORD_IMPUT);
    const botão = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(password, { target: { value: '12345' } });
    expect(botão).toHaveAttribute('disabled');
  });

  it('Colocando email e senha válidos o botão deve estar habilitado', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const email = getByTestId(EMAIL_IMPUT);
    const password = getByTestId(PASSWORD_IMPUT);
    const button = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(password, { target: { value: '1234567' } });
    fireEvent.change(email, { target: { value: 'teste@test.com' } });
    expect(button).not.toHaveAttribute('disabled');
  });

  it('Ao clicar no botão ENTRAR redirecionar para tela /comidas', () => {
    const { history, getByTestId, getByRole } = renderWithRouter(<App />);

    const email = getByTestId(EMAIL_IMPUT);
    const password = getByTestId(PASSWORD_IMPUT);
    fireEvent.change(password, { target: { value: '1234567' } });
    fireEvent.change(email, { target: { value: 'teste@test.com' } });

    const buttonEntrar = getByRole('button', {
      name: /entrar/i,
    });
    userEvent.click(buttonEntrar);
    // await waitForElement(() => {
    //   const comidaText = getByText(/comidas/i);
    //   return expect(comidaText).toBeInTheDocument();
    // });
    const { pathname } = history.location;
    console.log(history.location);
    expect(pathname).toBe('/comidas');
  });
});
