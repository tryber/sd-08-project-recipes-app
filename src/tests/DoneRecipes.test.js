import { screen } from '@testing-library/dom';
import React from 'react';
import RecipesDoneAndFavorite from '../pages/RecipesDoneAndFavorite';
import { renderWithRouterAndStore } from './testConfig';

describe('DoneRecipes page', () => {
  const pathname = '/receitas-feitas';
  const props = { location: { pathname } };
  renderWithRouterAndStore(<RecipesDoneAndFavorite { ...props } />,
    { route: pathname });
  it('has the filter buttons', () => {
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-food-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');
    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });

  it('shows a done recipe', async () => {
    const doneRecipe = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
  });
});
