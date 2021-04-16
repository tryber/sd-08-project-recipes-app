import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';

import renderWithRouter from './helpers/renderWithRouter';
import MainFood from '../containers/MainFood';
import { CATEGORIES_LENGTH_5, MAIN_FOOD_CARD_LENGTH_12 } from '../constants';

const SEARCH_TOP_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

const FOURTEEN = 14;

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
});

describe('MainFood section', () => {
  beforeEach(cleanup);
  it('should renders Header', () => {
    renderWithRouter(
      <MainFood />,
      {
        route: '/comidas',
      },
    );

    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
  });

  it('should renders Footer', async () => {
    const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    await act(async () => {
      renderWithRouter(
        <MainFood />,
        {
          route: '/comidas',
        },
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(mockTest).toBeCalled();
      expect(mockTest).toBeCalledTimes(2);

      const buttons = screen.getAllByRole('button');
      console.log(buttons.length);
      expect(buttons.length).toBe(CATEGORIES_LENGTH_5);

      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
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
      expect(card.firstChild.src).toBe(meals.meals[index].strMealThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(meals.meals[index].strMeal);
    });

    const beefButton = screen.getByRole('button', {
      name: /beef/i,
    });

    // console.log(odinaryDrinkButton);
    await act(async () => {
      userEvent.click(beefButton);
    });

    const mainCardsBeef = screen.getAllByTestId(/-recipe-card/i);
    // console.log(mainCardsOrdinaryDrinks.length);

    mainCardsBeef.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(beefMeals.meals[index].strMealThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(beefMeals.meals[index].strMeal);
    });

    const breakfastButton = screen.getByRole('button', {
      name: /breakfast/i,
    });

    // console.log(odinaryDrinkButton);
    await act(async () => {
      userEvent.click(breakfastButton);
    });

    const mainCardsBreakfast = screen.getAllByTestId(/-recipe-card/i);
    // console.log(mainCardsOrdinaryDrinks.length);

    mainCardsBreakfast.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.src).toBe(breakfastMeals.meals[index].strMealThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.innerHTML.replace('amp;', ''))
        .toEqual(breakfastMeals.meals[index].strMeal);
    });
  });

  it('should fetch', async () => {
    const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    await act(async () => {
      renderWithRouter(
        <MainFood />, '/comidas',
      );
    });

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(searchInput, 'c');
    userEvent.click(firstLetterSearchRadio);

    expect(execSearchBtn).not.toBeDisabled();
    userEvent.click(execSearchBtn);

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(FOURTEEN);

    userEvent.click(searchTopBtn);
    userEvent.type(searchInput, 'corba');
    userEvent.click(nameSearchRadio);
    expect(execSearchBtn).not.toBeDisabled();
    userEvent.click(execSearchBtn);

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(FOURTEEN);

    userEvent.click(searchTopBtn);
    userEvent.type(searchInput, 'beef');
    userEvent.click(ingredientSearchRadio);
    expect(execSearchBtn).not.toBeDisabled();
    userEvent.click(execSearchBtn);

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(FOURTEEN);
  });
});
