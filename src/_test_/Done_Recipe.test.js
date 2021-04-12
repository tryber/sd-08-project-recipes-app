import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import DoneRecipes from '../Pages/ReceitasFeitas';

const local = [
  {
    id: '15997',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '7/04/2021',
    tags: [],
  },
  {
    id: '52977',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '7/04/2021',
    tags: [
      'Soup',
    ],
  },
];

const ENTRIES_URL = '/receitas-feitas';
const ID_0 = '0-horizontal-top-text';
const ID_1 = '1-horizontal-top-text';

describe('<DoneRecipe />', () => {
  it('Verifica se a tela contem 3 botões', () => {
    renderWithRouterAndRedux(<DoneRecipes />, {
      initialEntries: [ENTRIES_URL],
    });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Testa o click dos botão food', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(local));

    renderWithRouterAndRedux(<DoneRecipes />, {
      initialEntries: [ENTRIES_URL],
    });

    userEvent.click(screen.getByTestId('filter-by-food-btn'));

    expect(screen.getByTestId(ID_0)).toBeInTheDocument();
    expect(screen.queryByTestId(ID_1)).toBe(null);
  });

  it('Testa o click dos botão drink e All', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(local));

    renderWithRouterAndRedux(<DoneRecipes />, {
      initialEntries: [ENTRIES_URL],
    });

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    expect(screen.getByTestId(ID_0)).toBeInTheDocument();
    expect(screen.queryByTestId(ID_1)).toBe(null);

    userEvent.click(screen.getByTestId('filter-by-all-btn'));

    expect(screen.getByTestId(ID_0)).toBeInTheDocument();
    expect(screen.getByTestId(ID_1)).toBeInTheDocument();
  });
});
