import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
jest.mock('clipboard-copy');

import { Router } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import FeitasFavoritas from '../pages/FeitasFavoritas';
import favoriteRecipes from '../mocks/favoriteRecipes';

import fetchMock from '../mocks/fetch';
import doneRecipes from '../mocks/doneRecipes';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

const renderPageHistory = (initialEntries) => {
  const history = createMemoryHistory({ initialEntries });
  return render(
      <Router history={ history }>
        <FeitasFavoritas />
      </Router>
    );
};

describe('Feitas', () => {
  beforeEach(() => {
    fetchMock();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(doneRecipes)),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test('54 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-feitas']);
    expect(localStorage.getItem).toHaveBeenCalledWith('doneRecipes');
    const allBtn = await findByTestId('filter-by-all-btn');
    expect(allBtn.value).toBe('All');
    const foodBtn = await findByTestId('filter-by-food-btn');
    expect(foodBtn.value).toBe('Food');
    const drinkBtn = await findByTestId('filter-by-drink-btn');
    expect(drinkBtn.value).toBe('Drinks');

    const firstRecipe = doneRecipes[0];
    const firstRecipeImg = await findByTestId('0-horizontal-image');
    expect(firstRecipeImg.src).toBe(firstRecipe.image);
    const firstRecipeText = await findByTestId('0-horizontal-top-text');
    expect(firstRecipeText.innerHTML)
      .toBe(`${firstRecipe.area} - ${firstRecipe.category}`);
    const firstRecipeName = await findByTestId('0-horizontal-name');
    expect(firstRecipeName.innerHTML).toBe(firstRecipe.name);
    const firstRecipeDate = await findByTestId('0-horizontal-done-date');
    expect(firstRecipeDate.innerHTML).toBe(firstRecipe.doneDate);
    const firstRecipeShare = await findByTestId('0-horizontal-share-btn');
    expect(firstRecipeShare.src).toBe(shareIcon);
    for (const tag of doneRecipes[0].tags) {
      const firstRecipeTag = await findByTestId(`0-${tag}-horizontal-tag`);
      expect(firstRecipeTag.innerHTML).toBe(tag);
    };
  });

  test('55 e 56', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-feitas']);
    const foodBtn = await findByTestId('filter-by-food-btn');
    const drinkBtn = await findByTestId('filter-by-drink-btn');
    userEvent.click(foodBtn);
    const {area, category} = doneRecipes[0];
    const firstFoodRecipeText = await findByTestId('0-horizontal-top-text');
    expect(firstFoodRecipeText.innerHTML).toBe(`${area} - ${category}`);
    userEvent.click(drinkBtn);
    const {alcoholicOrNot} = doneRecipes[1];
    const firstDrinkRecipeText = await findByTestId('0-horizontal-top-text');
    expect(firstDrinkRecipeText.innerHTML).toBe(alcoholicOrNot);
  });

  test('57 - Desenvolva a solução de maneira que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', async () => {
    const {findByTestId, queryAllByText} = renderPageHistory(['/receitas-feitas']);
    const firstRecipeShare = await findByTestId('0-horizontal-share-btn');
    userEvent.click(firstRecipeShare);
    expect(queryAllByText('Link copiado!')[0].hidden).toBeFalsy();
    expect(copy).toHaveBeenCalledTimes(1);
    const foodId = doneRecipes[0].id;
    expect(copy).toHaveBeenCalledWith(`http://localhost:3000/comidas/${foodId}`)
  });

  test('58 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-feitas']);
    const allBtn = await findByTestId('filter-by-all-btn');
    const foodBtn = await findByTestId('filter-by-food-btn');
    const drinkBtn = await findByTestId('filter-by-drink-btn');
    userEvent.click(foodBtn);
    const foodRecipeName = await findByTestId('0-horizontal-name');
    expect(foodRecipeName.innerHTML).toBe(doneRecipes[0].name);
    userEvent.click(drinkBtn);
    const drinkRecipeName = await findByTestId('0-horizontal-name');
    expect(drinkRecipeName.innerHTML).toBe(doneRecipes[1].name);
    userEvent.click(allBtn);
    const firstRecipe = await findByTestId('0-horizontal-name');
    const secondRecipe = await findByTestId('1-horizontal-name');
    expect(firstRecipe.innerHTML).toBe(doneRecipes[0].name);
    expect(secondRecipe.innerHTML).toBe(doneRecipes[1].name);
  });

  test('59 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita', async () => {
    const history = createBrowserHistory();
    history.push('/receitas-feitas');
    const {findByTestId} = render(
      <Router history={ history }>
        <FeitasFavoritas />
      </Router>
    );
    const drinkCard = await findByTestId('1-horizontal-image');
    const drinkId = doneRecipes[1].id;
    userEvent.click(drinkCard);
    expect(history.location.pathname).toBe(`/bebidas/${drinkId}`)
  });
});

describe('Favoritas', () => {
  beforeEach(() => {
    fetchMock();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(favoriteRecipes)),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test('60 - Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas) respeitando os atributos descritos no protótipo', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-favoritas']);
    expect(localStorage.getItem).toHaveBeenCalledWith('favoriteRecipes');
    const allBtn = await findByTestId('filter-by-all-btn');
    expect(allBtn.value).toBe('All');
    const foodBtn = await findByTestId('filter-by-food-btn');
    expect(foodBtn.value).toBe('Food');
    const drinkBtn = await findByTestId('filter-by-drink-btn');
    expect(drinkBtn.value).toBe('Drinks');

    const firstRecipe = favoriteRecipes[0];
    const firstRecipeImg = await findByTestId('0-horizontal-image');
    expect(firstRecipeImg.src).toBe(firstRecipe.image);
    const firstRecipeText = await findByTestId('0-horizontal-top-text');
    expect(firstRecipeText.innerHTML)
      .toBe(`${firstRecipe.area} - ${firstRecipe.category}`);
    const firstRecipeName = await findByTestId('0-horizontal-name');
    expect(firstRecipeName.innerHTML).toBe(firstRecipe.name);
    const firstRecipeShare = await findByTestId('0-horizontal-share-btn');
    expect(firstRecipeShare.src).toBe(shareIcon);
    const firstRecipeUnfavorite = await findByTestId('0-horizontal-favorite-btn');
    expect(firstRecipeUnfavorite.src).toBe(favoriteIcon);
  });

  test('61 e 62', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-favoritas']);
    const foodBtn = await findByTestId('filter-by-food-btn');
    const drinkBtn = await findByTestId('filter-by-drink-btn');
    userEvent.click(foodBtn);
    const {area, category} = favoriteRecipes[0];
    const firstFoodRecipeText = await findByTestId('0-horizontal-top-text');
    expect(firstFoodRecipeText.innerHTML).toBe(`${area} - ${category}`);
    userEvent.click(drinkBtn);
    const {alcoholicOrNot} = favoriteRecipes[1];
    const firstDrinkRecipeText = await findByTestId('0-horizontal-top-text');
    expect(firstDrinkRecipeText.innerHTML).toBe(alcoholicOrNot);
  });

  test('63 - Desenvolva a solução de maneira que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', async () => {
    const {findByTestId, queryAllByText} = renderPageHistory(['/receitas-favoritas']);
    const firstRecipeShare = await findByTestId('0-horizontal-share-btn');
    userEvent.click(firstRecipeShare);
    expect(queryAllByText('Link copiado!')[0].hidden).toBeFalsy();
    expect(copy).toHaveBeenCalledTimes(2);
    const foodId = favoriteRecipes[0].id;
    expect(copy).toHaveBeenCalledWith(`http://localhost:3000/comidas/${foodId}`)
  });

  test('64 - Desenvolva a solução de maneira que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do `localStorage` e da tela', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-favoritas']);
    const firstRecipeUnfav = await findByTestId('0-horizontal-favorite-btn');
    expect(firstRecipeUnfav).toBeInTheDocument();
    userEvent.click(firstRecipeUnfav);
    expect(firstRecipeUnfav).not.toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  test('65 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', async () => {
    const {findByTestId} = renderPageHistory(['/receitas-favoritas']);
    const allBtn = await findByTestId('filter-by-all-btn');
    const foodBtn = await findByTestId('filter-by-food-btn');
    const drinkBtn = await findByTestId('filter-by-drink-btn');
    userEvent.click(foodBtn);
    const foodRecipeName = await findByTestId('0-horizontal-name');
    expect(foodRecipeName.innerHTML).toBe(favoriteRecipes[0].name);
    userEvent.click(drinkBtn);
    const drinkRecipeName = await findByTestId('0-horizontal-name');
    expect(drinkRecipeName.innerHTML).toBe(favoriteRecipes[1].name);
    userEvent.click(allBtn);
    const firstRecipe = await findByTestId('0-horizontal-name');
    const secondRecipe = await findByTestId('1-horizontal-name');
    expect(firstRecipe.innerHTML).toBe(favoriteRecipes[0].name);
    expect(secondRecipe.innerHTML).toBe(favoriteRecipes[1].name);
  });

  test('66 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita', async () => {
    const history = createBrowserHistory();
    history.push('/receitas-favoritas');
    const {findByTestId} = render(
      <Router history={ history }>
        <FeitasFavoritas />
      </Router>
    );
    const drinkCard = await findByTestId('1-horizontal-image');
    const drinkId = favoriteRecipes[1].id;
    userEvent.click(drinkCard);
    expect(history.location.pathname).toBe(`/bebidas/${drinkId}`)
  });
});