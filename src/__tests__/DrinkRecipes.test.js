import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';
import {
  user,
  fetchInitialCategoryDrink,
  fetchCocktailCategoryRecipes,
  fetchDrinksByIngredients,
  searchByIngredientGin,
} from '../TestsMocks/mockDrinkRecipes';

describe('DrinksRecipes.js', () => {
  test('if the DrinksRecipes page render', () => {
    const recipes = { recipes: [], categories: fetchInitialCategoryDrink };
    const INITIAL_ENTRIES = {
      initialEntries: ['/bebidas'],
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

    expect(history.location.pathname).toBe('/bebidas');

    const profileIcon = screen.getByAltText('profile-icon');
    const title = screen.getByRole('heading', { level: 1, name: /bebidas/i });
    const searchIcon = screen.getByAltText('search-icon');

    expect(profileIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    const ordinaryCategory = screen.getByRole('button', { name: /Ordinary Drink/i });
    const cocktailCategory = screen.getByRole('button', { name: /Cocktail/i });
    const milkCategory = screen.getByRole('button', { name: /Milk \/ Float \/ Shake/i });
    const otherCategory = screen.getByRole('button', { name: /Other\/Unknown/i });
    const cocoaCategory = screen.getByRole('button', { name: /Cocoa/i });
    const allCategory = screen.getByRole('button', { name: /all/i });

    expect(ordinaryCategory).toBeInTheDocument();
    expect(cocktailCategory).toBeInTheDocument();
    expect(milkCategory).toBeInTheDocument();
    expect(otherCategory).toBeInTheDocument();
    expect(cocoaCategory).toBeInTheDocument();
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
      recipes: fetchCocktailCategoryRecipes,
      categories: fetchInitialCategoryDrink,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/bebidas'],
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

    const cocktailCategory = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(cocktailCategory);
    expect(firstCard).toBeInTheDocument();
    expect(firstCardName).toHaveTextContent('155 Belmont');
  });

  test('if it filter recipes by ingredients', () => {
    const recipes = {
      recipes: fetchDrinksByIngredients,
      categories: fetchInitialCategoryDrink,
    };
    const search = {
      ...searchByIngredientGin,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/bebidas'],
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
    expect(firstCardName).toHaveTextContent('3-Mile Long Island Iced Tea');
  });
});
