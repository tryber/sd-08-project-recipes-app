import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import DrinkCatsButtons from '../components/DrinkCatsButtons';
import { fetchInitialCategoryDrink } from '../TestsMocks/mockDrinkRecipes';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import { CLEAR_RECIPES, CLEAR_SEARCH } from '../redux/actions/index';

describe('DrinkCatsButtons.js', () => {
  test('if the handleClick function is called', () => {
    const recipes = { recipes: [], categories: fetchInitialCategoryDrink };
    const search = {
      drinkFilter: 'Cocktail',
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/bebidas'],
      initialState: {
        recipes,
        search,
      },
    };
    const expectClearRecipesAction = { type: CLEAR_RECIPES };
    const expectClearSearchAction = { type: CLEAR_SEARCH };

    renderWithReduxandRouter(<DrinkCatsButtons />, INITIAL_ENTRIES);

    const buttonAll = screen.getByTestId('All-category-filter');
    const buttonCocktail = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(buttonCocktail);
    expect(clearRecipesAction()).toEqual(expectClearRecipesAction);
    expect(clearSearchAction()).toEqual(expectClearSearchAction);
    userEvent.click(buttonAll);
    expect(clearRecipesAction()).toEqual(expectClearRecipesAction);
    expect(clearSearchAction()).toEqual(expectClearSearchAction);
  });
});
