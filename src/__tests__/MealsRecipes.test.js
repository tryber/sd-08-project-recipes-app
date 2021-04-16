import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';
import {
  user,
  fetchInitialCategoryMeal,
  fetchChickenCategoryRecipes,
  fetchSalmonIngredientRecipes,
  searchByIngredient,
} from '../TestsMocks/mockMealrecipes';

describe('MealsRecipes.js', () => {
  test('if the MealsRecipes page render', () => {
    const recipes = { recipes: [], categories: fetchInitialCategoryMeal };
    const INITIAL_ENTRIES = {
      initialEntries: ['/comidas'],
      initialState: {
        user,
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/comidas');

    const profileIcon = screen.getByAltText('profile-icon');
    const title = screen.getByRole('heading', { level: 1, name: /comidas/i });
    const searchIcon = screen.getByAltText('search-icon');

    expect(profileIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    const beefCategory = screen.getByRole('button', { name: /beef/i });
    const breakfastCategory = screen.getByRole('button', { name: /breakfast/i });
    const chickenCategory = screen.getByRole('button', { name: /chicken/i });
    const dessertCategory = screen.getByRole('button', { name: /dessert/i });
    const goatCategory = screen.getByRole('button', { name: /goat/i });
    const allCategory = screen.getByRole('button', { name: /all/i });

    expect(beefCategory).toBeInTheDocument();
    expect(breakfastCategory).toBeInTheDocument();
    expect(chickenCategory).toBeInTheDocument();
    expect(dessertCategory).toBeInTheDocument();
    expect(goatCategory).toBeInTheDocument();
    expect(allCategory).toBeInTheDocument();

    const footer = screen.getByTestId('footer');
    const drinkIcon = screen.getByAltText('drinks');
    const explorerIcon = screen.getByAltText('explorer');
    const mealsIcon = screen.getByAltText('meals');

    expect(footer).toContainElement(drinkIcon);
    expect(footer).toContainElement(explorerIcon);
    expect(footer).toContainElement(mealsIcon);
  });

  test('if it filter recipes by categories', () => {
    const recipes = {
      recipes: fetchChickenCategoryRecipes,
      categories: fetchInitialCategoryMeal,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/comidas'],
      initialState: {
        user,
        recipes,
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const firstCard = screen.getByTestId('0-recipe-card');
    const firstCardName = screen.getByTestId('0-card-name');
    expect(firstCard).toBeInTheDocument();

    const chickenCategory = screen.getByTestId('chicken-category-filter');
    userEvent.click(chickenCategory);
    expect(firstCard).toBeInTheDocument();
    expect(firstCardName).toHaveTextContent('Brown Stew Chicken');
  });

  test('if it filter recipes by ingredients', () => {
    const recipes = {
      recipes: fetchSalmonIngredientRecipes,
      categories: fetchInitialCategoryMeal,
    };
    const search = {
      ...searchByIngredient,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/comidas'],
      initialState: {
        user,
        recipes,
        search,
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const firstCardName = screen.getByTestId('0-card-name');
    expect(firstCardName).toBeInTheDocument();
    expect(firstCardName).toHaveTextContent('Baked salmon with fennel & tomatoes');
  });
});
