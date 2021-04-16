import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import MealCatsButtons from '../components/MealCatsButton';
import { fetchInitialCategoryMeal } from '../TestsMocks/mockMealrecipes';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import { CLEAR_RECIPES, CLEAR_SEARCH, FILTER_MEAL_CAT } from '../redux/actions/index';
import filterMealCatsAction from '../redux/actions/filterMealCatAction';

describe('MealCatsButtons.js', () => {
  test('if the handleClick function is called', () => {
    const recipes = { recipes: [], categories: fetchInitialCategoryMeal };
    const search = {
      mealFilter: 'chicken',
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/comidas'],
      initialState: {
        recipes,
        search,
      },
    };
    const expectClearRecipesAction = { type: CLEAR_RECIPES };
    const expectClearSearchAction = { type: CLEAR_SEARCH };
    const expectFilterCatAction = {
      type: FILTER_MEAL_CAT,
      payload: { mealFilter: 'beef' },
    };

    renderWithReduxandRouter(<MealCatsButtons />, INITIAL_ENTRIES);

    const buttonAll = screen.getByTestId('All-category-filter');
    const buttonChicken = screen.getByTestId('chicken-category-filter');
    const buttonBeef = screen.getByTestId('beef-category-filter');

    userEvent.click(buttonChicken);
    expect(clearRecipesAction()).toEqual(expectClearRecipesAction);
    expect(clearSearchAction()).toEqual(expectClearSearchAction);
    userEvent.click(buttonBeef);
    expect(filterMealCatsAction('beef')).toEqual(expectFilterCatAction);
    userEvent.click(buttonAll);
    expect(clearRecipesAction()).toEqual(expectClearRecipesAction);
    expect(clearSearchAction()).toEqual(expectClearSearchAction);
  });
});
