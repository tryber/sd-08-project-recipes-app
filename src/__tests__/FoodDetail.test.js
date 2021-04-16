import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';
import {
  fetchInitialCategoryMeal,
} from '../TestsMocks/mockMealrecipes';
import { ArrabiataSingleRecipe } from '../TestsMocks/singleMealRecipe';
import { fetchInitialCategoryDrink } from '../TestsMocks/mockDrinkRecipes';
import { dryMartiniSingleRecipe } from '../TestsMocks/singleDrinkRecipe';
import { fetchCocktailInitialRecipes } from '../TestsMocks/mockInitialDrinks';

const ENTRIES_MEAL = '/comidas/52771';
const ENTRIES_DRINK = '/bebidas/11005';

describe('FoodDetail.js', () => {
  test('if the FoodDetail page render with Meal', () => {
    const recipes = {
      recipes: [],
      singleRecipe: ArrabiataSingleRecipe,
      categories: fetchInitialCategoryMeal,
    };
    const SIX = 6;
    const recomendation = {
      recomendation: fetchCocktailInitialRecipes.slice(0, SIX),
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_MEAL],
      initialState: {
        recipes,
        recomendation,
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');

    const recipeImg = screen.getByAltText('img');
    expect(recipeImg).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const recomendationCard = screen.getByTestId('0-recomendation-card');
    expect(recomendationCard).toBeInTheDocument();
  });

  test('if the start recipe btn redirect page', () => {
    const recipes = {
      recipes: [],
      singleRecipe: ArrabiataSingleRecipe,
      categories: fetchInitialCategoryMeal,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_MEAL],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);

    expect(history.location.pathname).toBe('/comidas/52771/in-progress');
  });

  test('if will fetch as no single recipe is set in /comidas', () => {
    const recipes = {
      recipes: [],
      singleRecipe: [],
      categories: fetchInitialCategoryMeal,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_MEAL],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/comidas/52771');
  });

  test('if the FoodDetail page render with Drink', () => {
    const recipes = {
      recipes: [],
      singleRecipe: dryMartiniSingleRecipe,
      categories: fetchInitialCategoryMeal,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_DRINK],
      initialState: {
        recipes,
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Dry Martini');

    const recipeImg = screen.getByAltText('img');
    expect(recipeImg).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  test('if will fetch as no single recipe is set in /bebidas', () => {
    const recipes = {
      recipes: [],
      singleRecipe: [],
      categories: fetchInitialCategoryDrink,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_DRINK],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/bebidas/11005');
  });
});

describe('BeginContinueRecipeBtn.jsx', () => {
  test('if will do not have recipe done at localStorage', () => {
    const recipes = {
      recipes: [],
      singleRecipe: dryMartiniSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_DRINK],
      initialState: {
        recipes,
      },
    };
    const doneStorageRecipes = [{
      id: '14610',
      type: 'bebida',
      area: '',
      category: 'Shot',
      alcoholicOrNot: 'alcoholic',
      name: 'ACID',
      image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
      doneDate: '05/04/2021',
      tags: [],
    }];

    const inProgressRecipes = {
      cocktails: {
        14610: ['151 proof rum'],
      },
      meals: {
        52844: ['Olive Oil'],
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          doneRecipes: JSON.stringify(doneStorageRecipes),
          inProgressRecipes: JSON.stringify(inProgressRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();
  });

  test('if will have a recipe in progress at localStorage', () => {
    const recipes = {
      recipes: [],
      singleRecipe: ArrabiataSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIES_MEAL],
      initialState: {
        recipes,
      },
    };
    const inProgressRecipes = {
      cocktails: {
        14610: ['151 proof rum'],
      },
      meals: {
        52771: ['penne rigate'],
      },
    };

    renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          inProgressRecipes: JSON.stringify(inProgressRecipes),
        } }
      >
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();
  });
});
