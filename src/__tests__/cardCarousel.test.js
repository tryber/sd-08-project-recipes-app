import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
// import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import mockFetch from '../../cypress/mocks/fetch';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import renderWithRouter from './helpers/renderWithRouter';
import FoodDetails from '../containers/FoodDetails';
import DrinkDetails from '../containers/DrinkDetails';

const cardCarousel = {
  meals: {
    thumb: 'strMealThumb',
    title: 'strMeal',
    category: 'strCategory',
  },
  drinks: {
    thumb: 'strDrinkThumb',
    title: 'strDrink',
    category: 'strCategory',
  },
};

const NUMBER_SIX = 6;

// let container = null;
// beforeEach(() => {
//   // DOM as render target
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // Clear
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

describe('CardCarousel component when the recipe is food: ', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  it('should renders two drink cards, but six are in the document', async () => {
    await act(async () => {
      renderWithRouter(
        <FoodDetails />,
        {
          route: '/comidas/52977',
        },
      );
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      const cards = screen.getAllByTestId(/-recomendation-card/i);
      expect(cards.length).toBe(NUMBER_SIX);
      // console.log(card);
      const cardImages = screen.getAllByAltText('recomendation-card-img');
      // console.log(cardImages);
      for (let i = 0; i < NUMBER_SIX; i += 1) {
        // console.log(cardImages[i].src);
        expect(cardImages[i].src).toBe(drinks.drinks[i][cardCarousel.drinks.thumb]);
      }
      const cardTitles = screen.getAllByTestId(/-recomendation-title/i);
      // console.log(cardTitles);
      for (let i = 0; i < NUMBER_SIX; i += 1) {
        expect(cardTitles[i].innerHTML).toBe(drinks.drinks[i][cardCarousel.drinks.title]);
      }
      const cardCategories = screen.getAllByTestId(/-recomendation-category/i);
      // console.log(cardCategories);
      for (let i = 0; i < NUMBER_SIX; i += 1) {
        expect(cardCategories[i].innerHTML)
          .toBe(drinks.drinks[i][cardCarousel.drinks.category]);
      }
    });
  });
});

describe('CardCarousel component when the recipe is drink: ', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  it('should renders two food cards, but six are in the document', async () => {
    await act(async () => {
      renderWithRouter(
        <DrinkDetails />,
        {
          route: '/bebidas/178319',
        },
      );
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i),
        { options: { timeout: 2000 } });
      const cards = screen.getAllByTestId(/-recomendation-card/i);
      expect(cards.length).toBe(NUMBER_SIX);
      // expect(cards[1]).not.toBeInTheDocument();
      // console.log(card);
      const cardImages = screen.getAllByAltText('recomendation-card-img');
      // console.log(cardImages);
      for (let i = 0; i < NUMBER_SIX; i += 1) {
        // console.log(cardImages[i].src);
        expect(cardImages[i].src).toBe(meals.meals[i][cardCarousel.meals.thumb]);
      }
      const cardTitles = screen.getAllByTestId(/-recomendation-title/i);
      // console.log(cardTitles);
      for (let i = 0; i < NUMBER_SIX; i += 1) {
        expect(cardTitles[i].innerHTML).toBe(meals.meals[i][cardCarousel.meals.title]);
      }
      const cardCategories = screen.getAllByTestId(/-recomendation-category/i);
      // console.log(cardCategories);
      for (let i = 0; i < NUMBER_SIX; i += 1) {
        expect(cardCategories[i].innerHTML)
          .toBe(meals.meals[i][cardCarousel.meals.category]);
      }
    });
  });
});
