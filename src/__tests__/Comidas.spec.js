import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Comidas from '../pages/Comidas';
import Provider from '../context/Provider';
import fetchMock from '../mocks/fetch';



describe('Comidas Page', () => {
  beforeEach(() => {
    fetchMock();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({ email: 'hugostoso@bol.com.br' , mealsToken: 1 , cocktailsToken: 1})),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });


    const setup = async ()  => {
      const history = createMemoryHistory({initialEntries: ['/comidas']});
      const utils = render(
        <Provider>
          <Router  history={history}>
               <Comidas  />
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

  test('10 - Implemente um ícone para a tela de perfil, um título e um ícone para a busca, caso exista no protótipo', async () => {
    const { pageTitle} = await setup();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Comidas')
});

test('17 - Mostre as receitas em cards caso mais de uma receita seja encontrada', async () => {
    const { searchTopButton, utils } = await setup();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    fireEvent.click(searchTopButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
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

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
    // expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=gin');
    expect(await utils.queryByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-img')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-name')).not.toBeInTheDocument();
  });

test('26 - Carregue as 12 primeiras receitas de comidas ou comidas, uma em cada card', async () => {
    const { utils, history } = await setup();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const categoryFilter0 = await utils.findByTestId('Beef-category-filter');
    const categoryFilter1 = await utils.findByTestId('Breakfast-category-filter');
    const categoryFilter2 = await utils.findByTestId('Chicken-category-filter');
    const categoryFilter3 = await utils.findByTestId('Dessert-category-filter');
    const categoryFilter4 = await utils.findByTestId('Goat-category-filter');
    const categoryFilterAll = await utils.findByTestId('All-category-filter');
    expect(categoryFilter0).toBeInTheDocument();
    expect(categoryFilter1).toBeInTheDocument();
    expect(categoryFilter2).toBeInTheDocument();
    expect(categoryFilter3).toBeInTheDocument();
    expect(categoryFilter4).toBeInTheDocument();
    fireEvent.click(categoryFilter0);
    expect(await utils.queryByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-recipe-card')).toBeInTheDocument();
    // expect(await utils.queryByTestId('11-card-img')).toBeInTheDocument();
    // expect(await utils.queryByTestId('11-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-img')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-name')).not.toBeInTheDocument();
    fireEvent.click(categoryFilterAll);
    expect(await utils.queryByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-img')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-name')).not.toBeInTheDocument();
  });



  test('Buscando por ingrediente ', async () => {
    const { searchTopButton, utils } = await setup();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    fireEvent.click(searchTopButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const inputSearch = await utils.findByTestId('search-input');
    const radioIngredients =  await utils.findByTestId('ingredient-search-radio');
    const execSearchButton =  await utils.findByTestId('exec-search-btn');
    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredients).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
    fireEvent.change(inputSearch, {target: { value: 'chicken'}})
    fireEvent.click(radioIngredients);
    fireEvent.click(execSearchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    expect(await utils.queryByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('0-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-recipe-card')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-card-img')).toBeInTheDocument();
    expect(await utils.queryByTestId('11-card-name')).toBeInTheDocument();
    expect(await utils.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-img')).not.toBeInTheDocument();
    expect(await utils.queryByTestId('12-card-name')).not.toBeInTheDocument();
  });
})