import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../components/header/Header';
import Bebidas from '../pages/Bebidas';
import Provider from '../context/Provider';
import fetchMock from '../mocks/fetch';
import soupMeals from '../mocks/ginDrinks';
import ginDrinks from '../mocks/ginDrinks';

// import userEvent from '@testing-library/user-event';



describe('Header Page', () => {
  beforeEach(() => {
    fetchMock();
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
      const utils = render(
        <Provider>
          <Router  history={history}>
               <Header title="Teste" />
          </Router>
        </Provider>
      );
      const profileTopButton = await utils.findByTestId('profile-top-btn');
      const pageTitle =  await utils.findByTestId('page-title');
      const searchTopButton =  await utils.findByTestId('search-top-btn');

      return {
        profileTopButton, pageTitle, searchTopButton, history, utils: utils,
      } 
    }

  test('9 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', async () => {
    const {profileTopButton, pageTitle, searchTopButton} = await setup();
    expect(profileTopButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
  });

//   test('10 - Implemente um ícone para a tela de perfil, um título e um ícone para a busca, caso exista no protótipo', async () => {
//     const { inputEmail} = await setup();
//     expect(inputEmail.value).toBe('')
//     fireEvent.change(inputEmail, {target: { value: 'teste@email.com'}})
//     expect(inputEmail.value).toBe('teste@email.com')
// });

test('11 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', async () => {
    const {profileTopButton, history} = await setup();
    fireEvent.click(profileTopButton);
    expect(history.location.pathname).toBe('/perfil');
});
test('12 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', async () => {
  const {searchTopButton, utils } = await setup();
  // const utils = await setup();
  fireEvent.click(searchTopButton);
  const inputSearch = await utils.findByTestId('search-input');
  expect(inputSearch).toBeInTheDocument();
  fireEvent.click(searchTopButton);
  expect(inputSearch).not.toBeInTheDocument();
});
test('13 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo', async () => {
  const { searchTopButton, utils } = await setup();
  fireEvent.click(searchTopButton);
  const inputSearch = await utils.findByTestId('search-input');
  const radioIngredients =  await utils.findByTestId('ingredient-search-radio');
  const radioName =  await utils.findByTestId('name-search-radio');
  const radioFirstLetter = await utils.findByTestId('first-letter-search-radio');
  const execSearchButton =  await utils.findByTestId('exec-search-btn');
  expect(inputSearch).toBeInTheDocument();
  expect(radioIngredients).toBeInTheDocument();
  expect(radioName).toBeInTheDocument();
  expect(radioFirstLetter).toBeInTheDocument();
  expect(execSearchButton).toBeInTheDocument();

});
test('14 - Posicione a barra logo abaixo do header e implemente 3 radio buttons: Ingrediente, Nome e Primeira letra', async () => {
  const { searchTopButton, utils } = await setup();
  fireEvent.click(searchTopButton);
  const inputSearch = await utils.findByTestId('search-input');
  const radioIngredients =  await utils.findByTestId('ingredient-search-radio');
  const radioName =  await utils.findByTestId('name-search-radio');
  const radioFirstLetter = await utils.findByTestId('first-letter-search-radio');
  const execSearchButton =  await utils.findByTestId('exec-search-btn');
  expect(inputSearch).toBeInTheDocument();
  expect(radioIngredients).toBeInTheDocument();
  expect(radioName).toBeInTheDocument();
  expect(radioFirstLetter).toBeInTheDocument();
  expect(execSearchButton).toBeInTheDocument();
  fireEvent.change(inputSearch, {target: { value: 'soup'}})
  fireEvent.click(radioName);
  fireEvent.click(execSearchButton);
  expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  fireEvent.change(inputSearch, {target: { value: 'a'}})
  fireEvent.click(radioFirstLetter);
  fireEvent.click(execSearchButton);
  expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  fireEvent.change(inputSearch, {target: { value: 'chicken'}})
  fireEvent.click(radioIngredients);
  fireEvent.click(execSearchButton);
  expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
});
test('15 - Busque na API de comidas caso a pessoa esteja na página de comidas e na de bebidas caso esteja na de bebidas', async () => {
  const { searchTopButton, utils } = await setup();
  fireEvent.click(searchTopButton);
  const inputSearch = await utils.findByTestId('search-input');
  const radioIngredients =  await utils.findByTestId('ingredient-search-radio');
  const radioName =  await utils.findByTestId('name-search-radio');
  const radioFirstLetter = await utils.findByTestId('first-letter-search-radio');
  const execSearchButton =  await utils.findByTestId('exec-search-btn');
  expect(inputSearch).toBeInTheDocument();
  expect(radioIngredients).toBeInTheDocument();
  expect(radioName).toBeInTheDocument();
  expect(radioFirstLetter).toBeInTheDocument();
  expect(execSearchButton).toBeInTheDocument();
  fireEvent.change(inputSearch, {target: { value: 'soup'}})
  fireEvent.click(radioIngredients);
  fireEvent.click(execSearchButton);
  expect(fetchMock).toHaveBeenCalled; 
  fireEvent.change(inputSearch, {target: { value: 'a'}})
  fireEvent.click(radioFirstLetter);
  fireEvent.click(execSearchButton);
  expect(fetchMock).toHaveBeenCalled; 
  fireEvent.change(inputSearch, {target: { value: 'chicken'}})
  fireEvent.click(radioIngredients);
  fireEvent.click(execSearchButton);
  expect(fetchMock).toHaveBeenCalled; 
});

// test('5 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', async () => {
//     const { inputPassword, inputEmail , loginSubmitBtn } = await setup();
//     expect(inputPassword.value).toBe('')
//     expect(inputEmail.value).toBe('')
//     fireEvent.change(inputEmail , {target: { value: 'testeEmail.com'}})
//     fireEvent.change(inputPassword, {target: { value: '1234567'}})
//     expect(loginSubmitBtn).toBeDisabled();
//     fireEvent.change(inputEmail , {target: { value: 'teste@email'}})
//     fireEvent.change(inputPassword, {target: { value: '1234567'}})
//     expect(loginSubmitBtn).toBeDisabled();
//     fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
//     fireEvent.change(inputPassword, {target: { value: '123456'}})
//     expect(loginSubmitBtn).toBeDisabled();
//     fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
//     fireEvent.change(inputPassword, {target: { value: '1234567'}})
//     expect(loginSubmitBtn).not.toBeDisabled();
// });

// test('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas chaves mealsToken e cocktailsToken', async () => {
//     const { inputPassword, inputEmail , loginSubmitBtn } = await setup();
//     expect(inputPassword.value).toBe('')
//     expect(inputEmail.value).toBe('')
//     fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
//     fireEvent.change(inputPassword, {target: { value: '1234567'}})
//     expect(loginSubmitBtn).not.toBeDisabled();
//     fireEvent.click(loginSubmitBtn);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(3);
// });
// test('8 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', async () => {
//     const { inputPassword, inputEmail , loginSubmitBtn, history } = await setup();
//     fireEvent.change(inputEmail , {target: { value: 'teste@email.com'}})
//     fireEvent.change(inputPassword, {target: { value: '1234567'}})
//     fireEvent.click(loginSubmitBtn);
//     expect(history.location.pathname).toBe('/comidas');
//     // expect(localStorage.setItem).toHaveBeenCalledTimes(3);
// });
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