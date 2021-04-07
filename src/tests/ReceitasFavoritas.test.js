import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

const favoriteRecipes = [
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

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe('Testando a Tela de Receitas Favoritas', () => {
  it('Todos os data-testids estão disponíveis', () => {
    renderWithRouter(<ReceitasFavoritas />);

    expect(screen.queryByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });
});

describe('Testando os botões de filtro', () => {
  it('Ao clicar no botão de Drinks mostra apenas Drinks favoritadas', () => {
    renderWithRouter(<ReceitasFavoritas />);
    const filtrarDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filtrarDrinks);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });

  it('Ao clicar no botão de Food mostra apenas as Foods favoritadas', () => {
    renderWithRouter(<ReceitasFavoritas />);
    const filtrarFoods = screen.getByTestId('filter-by-food-btn');
    userEvent.click(filtrarFoods);

    expect(screen.getByText(/Penne/i)).toBeInTheDocument();
  });

  it('Ao clicar no botão de ALL mostra todas as receitas favoritadas', () => {
    renderWithRouter(<ReceitasFavoritas />);
    const filtrarAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filtrarAll);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});

describe('Testar o botão de compartilhar', () => {
  it('Ao clicar no botão de compartilhar a mensagem "Link copiado!" aparece', () => {
    renderWithRouter(<ReceitasFavoritas />);

    const botaoCompartilhar = screen
      .getByTestId('0-horizontal-share-btn');
    userEvent.click(botaoCompartilhar);

    const mensagem = screen.getAllByRole('tooltip', {
      name: /link copiado!/i,
    });
    expect(mensagem[0]).toBeInTheDocument();
  });
});

describe('Testar o botão de Desfavoritar', () => {
  it('Ao clicar no coração o item sai das favoritas', () => {
    renderWithRouter(<ReceitasFavoritas />);

    const botaoDesfavoritar = screen.getAllByAltText('Botão Favoritar');
    userEvent.click(botaoDesfavoritar[0]);

    const botaoFav = screen.getAllByAltText('Botão Favoritar')[0];
    expect(botaoFav).toBeInTheDocument();
  });
});
