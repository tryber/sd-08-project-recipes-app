import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Footer from '../components/footer/Footer';
import Provider from '../context/Provider';
import fetchMock from '../mocks/fetch';
// import soupMeals from './mocks/ginDrinks';
// import ginDrinks from './mocks/ginDrinks';

// import userEvent from '@testing-library/user-event';



describe('Footer Page', () => {
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
               <Footer title="Teste" />
          </Router>
        </Provider>
      );
      const foodBottomButton = await utils.findByTestId('food-bottom-btn');
      const exploreBottomButton =  await utils.findByTestId('explore-bottom-btn');
      const drinksBottomButton = await utils.findByTestId('drinks-bottom-btn');
      const footer =  await utils.findByTestId('footer');
      return {
        foodBottomButton, exploreBottomButton, drinksBottomButton, footer, history, utils: utils,
      } 
    }

  test('19 - Implemente os elementos do menu inferior respeitando os atributos descritos no protótipo', async () => {
    const {foodBottomButton, exploreBottomButton, drinksBottomButton, footer} = await setup();
    expect(foodBottomButton).toBeInTheDocument();
    expect(exploreBottomButton).toBeInTheDocument();
    expect(drinksBottomButton).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  test('22 - Redirecione a pessoa usuária para uma lista de cocktails ao clicar no ícone de bebidas', async () => {
    const {drinksBottomButton,  history} = await setup();
    fireEvent.click(drinksBottomButton);
    expect(history.location.pathname).toBe('/bebidas');
  });

  test('23 - Redirecione a pessoa usuária para a tela de explorar ao clicar no ícone de exploração', async () => {
    const { exploreBottomButton,  history} = await setup();
    fireEvent.click(exploreBottomButton);
    expect(history.location.pathname).toBe('/explorar');
  });

  test('24 - Redirecione a pessoa usuárua para uma lista de comidas ao clicar no ícone de comidas', async () => {
    const {foodBottomButton, history} = await setup();
    fireEvent.click(foodBottomButton);
    expect(history.location.pathname).toBe('/comidas');
  });
});
