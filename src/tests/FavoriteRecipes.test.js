import React from 'react';
import RecipesDoneAndFavorite from '../pages/RecipesDoneAndFavorite';
import { renderWithRouterAndStore } from './testConfig';

describe('FavoriteRecipes page', () => {
  it('shows a favorite recipe', () => {
    const pathname = '/receitas-favoritas';
    const props = { location: { pathname } };
    renderWithRouterAndStore(<RecipesDoneAndFavorite { ...props } />,
      { route: pathname });
    const favoriteRecipe = [
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
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
  });
});
