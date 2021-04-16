import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import { unmountComponentAtNode } from 'react-dom';
// import mockFetch from '../../cypress/mocks/fetch';
import drinks from '../../cypress/mocks/drinks';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from '../../cypress/mocks/fetch';
// import MainFood from '../containers/MainFood';
import Drinks from '../containers/Drinks';
import { MAIN_FOOD_CARD_LENGTH_12, CATEGORIES_LENGTH_5 } from '../constants';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';

describe('Drinks section', () => {
  beforeEach(cleanup);
  it('should renders Header', () => {
    // act(() => {
    renderWithRouter(
      <Drinks />,
      {
        route: '/bebidas',
      },
    );
    // });
    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
  });
});

describe('Drink categories section selections and results', () => {
  beforeEach(cleanup);

  it('select by All, Cocktails, Ordinary Drinks, Cocoa, and Milk drinks', async () => {
    const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    await act(async () => {
      renderWithRouter(
        <Drinks />,
        {
          route: '/bebidas',
        },
      );
    });

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    expect(mockTest).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(mockTest).toBeCalledTimes(2);
    const buttons = screen.getAllByRole('button');
    console.log(buttons.length);
    expect(buttons.length).toBe(CATEGORIES_LENGTH_5 * 2);

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    const mainCards = screen.getAllByTestId(/-recipe-card/i);
    expect(mainCards.length).toBe(MAIN_FOOD_CARD_LENGTH_12);

    mainCards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });

    const buttonAll = screen.getByText(/all/i);
    expect(buttonAll).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonAll);
    });

    // const mainCards = screen.getAllByTestId(/-recipe-card/i);
    mainCards.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(drinks.drinks[index].strDrinkThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(drinks.drinks[index].strDrink);
    });

    const odinaryDrinkButton = screen.getByRole('button', {
      name: /ordinary drink/i,
    });

    // console.log(odinaryDrinkButton);
    await act(async () => {
      userEvent.click(odinaryDrinkButton);
    });

    const mainCardsOrdinaryDrinks = screen.getAllByTestId(/-recipe-card/i);
    // console.log(mainCardsOrdinaryDrinks.length);

    mainCardsOrdinaryDrinks.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(ordinaryDrinks.drinks[index].strDrinkThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(ordinaryDrinks.drinks[index].strDrink);
    });

    const cocktailsButton = screen.getByRole('button', {
      name: /cocktail/i,
    });

    await act(async () => {
      userEvent.click(cocktailsButton);
    });

    const mainCardsCocktails = screen.getAllByTestId(/-recipe-card/i);

    mainCardsCocktails.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(cocktailDrinks.drinks[index].strDrinkThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(cocktailDrinks.drinks[index].strDrink);
    });

    const milkShakeButton = screen.getByRole('button', {
      name: /milk \/ float \/ shake/i,
    });

    await act(async () => {
      userEvent.click(milkShakeButton);
    });

    const mainCardsMilkShake = screen.getAllByTestId(/-recipe-card/i);

    mainCardsMilkShake.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(milkDrinks.drinks[index].strDrinkThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(milkDrinks.drinks[index].strDrink);
    });

    const cocoaButton = screen.getByRole('button', {
      name: /cocoa/i,
    });

    await act(async () => {
      userEvent.click(cocoaButton);
    });

    const mainCardsCocoa = screen.getAllByTestId(/-recipe-card/i);

    mainCardsCocoa.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(cocoaDrinks.drinks[index].strDrinkThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(cocoaDrinks.drinks[index].strDrink);
    });
  });
});

// describe('click on buttons', () => {
//   it('click button', async () => {
//     const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
//     await act(async () => {
//       renderWithRouter(
//         <Drinks />,
//         {
//           route: '/bebidas',
//         },
//       );
//     });

//     const buttonAll = screen.getByText(/all/i);
//     expect(buttonAll).toBeInTheDocument();

//     userEvent.click(buttonAll);
//     const mainCards = screen.getAllByTestId(/-recipe-card/i);
//     mainCards.forEach((card, index) => {
//       // console.log(card.childElementCount);
//       expect(card.childElementCount).toBe(2);
//       // console.log(card.firstChild.src);
//       expect(card.firstChild.src).toBe(drinks.drinks[index].strDrinkThumb);
//       // console.log(card.lastChild.innerHTML);
//       expect(card.lastChild.innerHTML.replace('amp;', ''))
//         .toEqual(drinks.drinks[index].strDrink);
//     });
//   });
// });
