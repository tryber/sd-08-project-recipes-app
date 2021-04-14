import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login/Login'
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';



describe('1 - Verifica os testes da página de Login', () => {
  test('Verifica se está na rota correta"', () => {
    const { history } = renderWithRouter(
    <Login/>,
    );
    const {pathname} = history.location
    expect(pathname).toBe('/')
  })
  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId,getByText } = renderWithRouter(
      <Login />,
    );
    const emailInput = getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder','Email...')
    const passInput = getByTestId('password-input');
    expect(passInput).toBeInTheDocument();
    expect(passInput).toHaveAttribute('placeholder','Senha...')
    const submitInput = getByTestId('login-submit-btn');
    expect(submitInput).toBeInTheDocument();
    expect(submitInput).toHaveTextContent('Entrar')
    const trybeSpan = getByText(/trybe/i)
    expect(trybeSpan).toBeInTheDocument();
    const imageRocksGLass = document.querySelector(".rocksGlass")
    expect(imageRocksGLass).toBeInTheDocument()
  });
  test('Verifica se as funcionalidades estão presentes', () => {
    const { getByTestId,history } = renderWithRouter(
      <Login />,
    );
    const {pathname} = history.location
    const submitInput = getByTestId('login-submit-btn');
    expect(submitInput.disabled).toBe(true);
    if(submitInput.disabled === false){
      userEvent.click(submitInput)
      expect(pathname).toBe('/comidas')
    }
  });
  test('Verifica a validacao do campo de senha e email', () => {
    const { getByTestId } = renderWithRouter(
      <Login />,
    );
    const submitInput = getByTestId('login-submit-btn');
    expect(submitInput.disabled).toBe(true)
    const passInput = getByTestId('password-input');
    userEvent.type(passInput,'12345678')
    const emailInput = getByTestId('email-input');
    userEvent.type(emailInput,'mateuscoury@gmail.com')
    expect(submitInput.disabled).toBe(false)
    
  });
  test('Verifica se existe algum localStorage', () => {
    renderWithRouter(
      <Login />,
    );
    const userStorage = JSON.parse(localStorage.getItem('user'))
    expect(userStorage).toBe(null) 
    const cocktailStorage = JSON.parse(localStorage.getItem('cocktailsToken'))
    expect(cocktailStorage).toBe(null) 
    const mealsStorage = JSON.parse(localStorage.getItem('mealsToken'))
    expect(mealsStorage).toBe(null) 
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'))
    expect(favoriteRecipesStorage).toBe(null) 
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'))
    expect(doneRecipesStorage).toBe(null) 
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'))
    expect(inProgressStorage).toBe(null) 
  });
})

describe('2 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(
      <Login />,
    );
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567' } });

    expect(getByTestId('password-input')).toHaveValue('1234567');
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(
      <Login />,
    );
    fireEvent.change(getByTestId('email-input'), { target: { value: 'email@mail.com' } });

    expect(getByTestId('email-input')).toHaveValue('email@mail.com');

  });
});

describe('4 - Salve o e-mail da pessoa usuária no localStorage na chave user após a submissão', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = renderWithRouter(
      <Login />,
    );

    fireEvent.change(getByTestId('email-input'), { target: { value: 'email@mail.com' } });

    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567' } });

    fireEvent.click(getByTestId('login-submit-btn'))


    const userStorage = JSON.parse(localStorage.getItem('user'))

    expect(userStorage).toEqual({ email: 'email@mail.com' })
    });
});
