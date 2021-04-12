import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import FavoriteRecipe from '../Pages/ReceitasFavoritas';

const local = [
  {
    id: '52978',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Kumpir',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  },
  {
    id: '52844',
    type: 'comida',
    area: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: '',
    name: 'Lasagne',
    image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
  },
  {
    id: '17203',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Kir',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  },
];

const ENTRIES_URL = '/receitas-favoritas';
const ID_0 = '0-horizontal-top-text';
const ID_1 = '1-horizontal-top-text';

describe('<FavoriteRecipe />', () => {
  it('Verifica se a tela contem 3 botões', () => {
    renderWithRouterAndRedux(<FavoriteRecipe />, {
      initialEntries: [ENTRIES_URL],
    });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Testa o click dos botão food', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(local));

    renderWithRouterAndRedux(<FavoriteRecipe />, {
      initialEntries: [ENTRIES_URL],
    });

    userEvent.click(screen.getByTestId('filter-by-food-btn'));

    expect(screen.getByTestId(ID_0)).toBeInTheDocument();
    expect(screen.getByTestId(ID_1)).toBeInTheDocument();
    expect(screen.queryByTestId('2-horizontal-top-text')).toBe(null);
  });

  it('Testa o click dos botão drink e All', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(local));

    renderWithRouterAndRedux(<FavoriteRecipe />, {
      initialEntries: [ENTRIES_URL],
    });

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    expect(screen.getByTestId(ID_0)).toBeInTheDocument();
    expect(screen.queryByTestId(ID_1)).toBe(null);

    userEvent.click(screen.getByTestId('filter-by-all-btn'));

    expect(screen.getByTestId(ID_0)).toBeInTheDocument();
    expect(screen.getByTestId(ID_1)).toBeInTheDocument();
    expect(screen.getByTestId('2-horizontal-top-text')).toBeInTheDocument();
  });
});
