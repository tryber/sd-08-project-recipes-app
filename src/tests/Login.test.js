import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import LoginForm from '../components/LoginForm';

describe('Teste o componente <LoginForm.js /.', () => {
  const emailDeTeste = 'teste@gmail.com';
  const emailTexto = 'Digite seu e-mail';

  it('Teste se a página contém as informações sobre o login', () => {
    renderWithRouter(<LoginForm />);

    const loginText = screen.getByText('Descubra as melhores receitas do mundo');
    expect(loginText).toBeInTheDocument();
  });

  it('O input de email deve estar na tela', () => {
    renderWithRouter(<LoginForm />);

    const emailText = screen.getByPlaceholderText(emailTexto);
    expect(emailText).toBeInTheDocument();
  });

  it('O input de senha deve estar na tela', () => {
    renderWithRouter(<LoginForm />);

    const senhaText = screen.getByPlaceholderText('Senha');
    expect(senhaText).toBeInTheDocument();
  });

  it('O botão Entrar deve estar desabilitado ao abrir a tela', () => {
    renderWithRouter(<LoginForm />);

    const botaoEntrar = screen.getByText('Entrar');

    expect(botaoEntrar.disabled).toBe(true);
  });

  it('O botão Entrar deve estar habilitado ao digitar email e senha', () => {
    renderWithRouter(<LoginForm />);

    const emailText = screen.getByPlaceholderText(emailTexto);
    const senhaText = screen.getByPlaceholderText('Senha');
    const botaoEntrar = screen.getByText('Entrar');

    userEvent.type(emailText, emailDeTeste);
    userEvent.type(senhaText, '1234567');

    expect(botaoEntrar.disabled).toBe(false);
  });

  it(`Ao clicar no botão Entrar, verifica se as informaçẽos estão no localstore
    e se muda para a página de comida`, () => {
    const { history } = renderWithRouter(<LoginForm />);

    const emailText = screen.getByPlaceholderText(emailTexto);
    const senhaText = screen.getByPlaceholderText('Senha');
    const botaoEntrar = screen.getByText('Entrar');

    userEvent.type(emailText, emailDeTeste);
    userEvent.type(senhaText, '1234567');
    userEvent.click(botaoEntrar);

    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    expect(JSON.parse(localStorage.getItem('user')))
      .toStrictEqual({ email: emailDeTeste });
    expect(history.location.pathname).toBe('/comidas');
  });
});
