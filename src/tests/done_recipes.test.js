import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ReceitasFeitas from '../pages/ReceitasFeitas';

const doneRecipes = [
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
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe(`Implemente os elementos da tela de receitas feitas respeitando
  os atributos descritos no protótipo`, () => {
  it('Todos os data-testids estão disponíveis', () => {
    renderWithRouter(<ReceitasFeitas />);

    expect(screen.queryByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(screen.queryByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-done-date')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-share-btn')).toBeInTheDocument();
  });
});

describe('Testar os botões de filtrar', () => {
  it('Ao clicar no botão de filterDrink é correto', () => {
    renderWithRouter(<ReceitasFeitas />);
    const filtrarDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filtrarDrinks);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });

  it('Ao clicar no botão de filterFood é correto', () => {
    renderWithRouter(<ReceitasFeitas />);
    const filtrarFoods = screen.getByTestId('filter-by-food-btn');
    userEvent.click(filtrarFoods);

    expect(screen.getByText(/Penne/i)).toBeInTheDocument();
  });

  it('Ao clicar no botão de filterALL é correto', () => {
    renderWithRouter(<ReceitasFeitas />);
    const filtrarAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filtrarAll);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});

describe('Testar o botão de compartilhar', () => {
  it('Ao clicar no botão de compartilhar a mensagem "Link copiado!" aparece', () => {
    renderWithRouter(<ReceitasFeitas />);

    const botaoCompartilhar = screen
      .getAllByRole('button', { name: 'Botão Compartilhar' });
    userEvent.click(botaoCompartilhar[0]);

    const mensagem = screen.getAllByRole('tooltip', {
      name: /link copiado!/i,
    });
    expect(mensagem[0]).toBeInTheDocument();
  });

  // it('A URL da tela de detalhes da receita é copiada para o clipboard', () => {
  //   renderWithRouter(<ReceitasFeitas />);
  //   const botaoCompartilhar = screen.queryByTestId('0-horizontal-share-btn');

  //   cy.window().then((win) => {
  //     cy.wrap(win.navigator.clipboard.readText())
  //       .should('eq', 'http://localhost:3000/comidas/52771');
  //   });
  // });
});
