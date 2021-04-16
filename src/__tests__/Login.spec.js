import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { useHistory } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import userEvent from '@testing-library/user-event';

describe('Login Page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });
  const setup = async ()  => {
      const history = createBrowserHistory();
    //   const { findByTestId } = render(<Login />);
    //   console.log( render(<Login />) );
      const utils = render(
          <Router  history={history}>
               <Login />
          </Router>
      );
      const loginSubmitBtn = await utils.findByTestId('login-submit-btn');
      const inputEmail =  await utils.findByTestId('email-input');
      const inputPassword =  await utils.findByTestId('password-input');
    //   console.log(inputEmail, inputPassword, loginSubmitBtn);
    // const historyLocation =  history.location.pathname ;
      return {
          inputEmail, inputPassword, loginSubmitBtn, history,
      } 
    }

  test('2- Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', async () => {
    const {inputEmail, inputPassword, loginSubmitBtn} = await setup();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
  });

  test('3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', async () => {
    const { inputEmail} = await setup();
    expect(inputEmail.value).toBe('')
    fireEvent.change(inputEmail, {target: { value: 'teste@email.com'}})
    expect(inputEmail.value).toBe('teste@email.com')
});

test('4 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever sua senha no input de senha', async () => {
    const { inputPassword} = await setup();
    expect(inputPassword.value).toBe('')
    fireEvent.change(inputPassword, {target: { value: 'testeSenha'}})
    expect(inputPassword.value).toBe('testeSenha')
});

test('5 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', async () => {
    const { inputPassword, inputEmail , loginSubmitBtn } = await setup();
    expect(inputPassword.value).toBe('')
    expect(inputEmail.value).toBe('')
    fireEvent.change(inputEmail , {target: { value: 'testeEmail.com'}})
    fireEvent.change(inputPassword, {target: { value: '1234567'}})
    expect(loginSubmitBtn).toBeDisabled();
    fireEvent.change(inputEmail , {target: { value: 'teste@email'}})
    fireEvent.change(inputPassword, {target: { value: '1234567'}})
    expect(loginSubmitBtn).toBeDisabled();
    fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
    fireEvent.change(inputPassword, {target: { value: '123456'}})
    expect(loginSubmitBtn).toBeDisabled();
    fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
    fireEvent.change(inputPassword, {target: { value: '1234567'}})
    expect(loginSubmitBtn).not.toBeDisabled();
});

test('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas chaves mealsToken e cocktailsToken', async () => {
    const { inputPassword, inputEmail , loginSubmitBtn } = await setup();
    expect(inputPassword.value).toBe('')
    expect(inputEmail.value).toBe('')
    fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
    fireEvent.change(inputPassword, {target: { value: '1234567'}})
    expect(loginSubmitBtn).not.toBeDisabled();
    fireEvent.click(loginSubmitBtn);
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
});
test('8 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', async () => {
    const { inputPassword, inputEmail , loginSubmitBtn, history } = await setup();
    fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
    fireEvent.change(inputPassword, {target: { value: '1234567'}})
    fireEvent.click(loginSubmitBtn);
    expect(history.location.pathname).toBe('/comidas');
    // expect(localStorage.setItem).toHaveBeenCalledTimes(3);
});
});
// test('84 - Implemente 3 botões: um de nome "Receitas Feitas", um de nome "Receitas Favoritas" e um de nome "Sair"', async () => {
//     const { findByRole } = render(<Perfil />);
//     const doneRecipesBtn = await findByRole('button', { name: 'Receitas Feitas' });
//     const favoriteRecipesBtn = await findByRole('button', { name: 'Receitas Favoritas' });
//     const exitBtn = await findByRole('button', { name: 'Sair' });
    
//     expect(doneRecipesBtn).toBeInTheDocument();
//     expect(favoriteRecipesBtn).toBeInTheDocument();
//     expect(exitBtn).toBeInTheDocument();
//   });

//   test('85 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Favoritas", a rota deve mudar para a tela de receitas favoritas', async () => {
//     const history = createBrowserHistory();
//     const { findByRole } = render(
//       <Router initialEntries={ ['/perfil'] } history={ history }>
//         <Perfil />
//       </Router>,
//     );
//     const favoriteRecipesBtn = await findByRole('button', { name: 'Receitas Favoritas' });
//     userEvent.click(favoriteRecipesBtn);
//     expect(history.location.pathname).toBe('/receitas-favoritas');
//   });

//   test('86 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Feitas", a rota deve mudar para a tela de receitas feitas', async () => {
//     const history = createBrowserHistory();
//     const { findByRole } = render(
//       <Router initialEntries={ ['/perfil'] } history={ history }>
//         <Perfil />
//       </Router>,
//     );
//     const doneRecipesBtn = await findByRole('button', { name: 'Receitas Feitas' });
//     userEvent.click(doneRecipesBtn);
//     expect(history.location.pathname).toBe('/receitas-feitas');
//   });

//   test('87 - Redirecione a pessoa usuária que, ao clicar no botão de "Sair", o localStorage deve ser limpo e a rota deve mudar para a tela de login', async () => {
//     const history = createBrowserHistory();
//     const { findByRole } = render(
//       <Router initialEntries={ ['/perfil'] } history={ history }>
//         <Perfil />
//       </Router>,
//     );
//     const exitBtn = await findByRole('button', { name: 'Sair' });
//     userEvent.click(exitBtn);
//     expect(localStorage.clear).toHaveBeenCalled();
//     expect(history.location.pathname).toBe('/');
//   });