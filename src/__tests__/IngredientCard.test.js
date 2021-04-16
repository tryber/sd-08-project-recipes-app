import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import IngredientCard from '../components/IngredientCard';
import { fetchInitialMealIngridients } from '../TestsMocks/mockMealIngredients';
import { fetchInitialDrinkIngridients } from '../TestsMocks/mockDrinkIngredients';

describe('IngredientCard.js', () => {
  test('if the ingredients is get by the url path comidas', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: fetchInitialMealIngridients,
    };

    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/comidas/ingredientes'],
      initialState: {
        recipes,
      },
    };
    const { history } = renderWithReduxandRouter(<IngredientCard
      index={ 0 }
      ingredient="Chicken"
      recipe="meal"
    />, INITIAL_ENTRIES);

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');

    const byIngredientBtn = screen.getByTestId('0-ingredient-card');
    expect(byIngredientBtn).toBeInTheDocument();

    userEvent.click(byIngredientBtn);

    expect(history.location.pathname).toBe('/comidas');
  });

  test('if the ingredients is get by the url path bebidas', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: fetchInitialDrinkIngridients,
    };

    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/bebidas/ingredientes'],
      initialState: {
        recipes,
      },
    };
    const { history } = renderWithReduxandRouter(<IngredientCard
      index={ 0 }
      ingredient="Light rum"
      recipe="drink"
    />, INITIAL_ENTRIES);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');

    const byIngredientBtn = screen.getByTestId('0-ingredient-card');
    expect(byIngredientBtn).toBeInTheDocument();

    userEvent.click(byIngredientBtn);

    expect(history.location.pathname).toBe('/bebidas');
  });
});
