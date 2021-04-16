import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import RecipesCards from '../components/RecipesCards';
import {
  fetchChickenCategoryRecipes, fetchInitialCategoryMeal,
} from '../TestsMocks/mockMealrecipes';
import { ArrabiataSingleRecipe } from '../TestsMocks/singleMealRecipe';

describe('RecipesCards.js', () => {
  test('if the input onChange function', () => {
    const recipes = {
      recipes: fetchChickenCategoryRecipes,
      categories: fetchInitialCategoryMeal,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/comidas'],
      initialState: {
        recipes,
      },
    };
    const { history } = renderWithReduxandRouter(<RecipesCards
      path="/comidas"
      elem={ ArrabiataSingleRecipe[0] }
      index={ 0 }
      type="Meal"
    />, INITIAL_ENTRIES);

    const button = screen.getByTestId('0-recipe-card');

    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/comidas/52771');
  });
});
