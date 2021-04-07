import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import RecipeProgress from '../Pages/RecipesProgress/ReceitasProgresso';

const THIRTEEN = 13;

describe('<Details />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a receita está sendo renderizada na tela', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const recipeTest = await screen.findByTestId('recipe-title');
    expect(recipeTest.innerHTML).toBe('Corba');
  });

  it('Verifica se a tela contem ingredientes', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const titleIngredients = await screen.findByRole('heading', {
      level: 1,
      name: 'Ingredientes',
    });
    expect(titleIngredients).toBeInTheDocument();

    for (let index = 0; index < THIRTEEN; index += 1) {
      expect(screen
        .getByTestId(`${index}-ingredient-step`)).toBeInTheDocument();
    }
  });

  it('Verifica se a tela contem instruções', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const titleInstructions = await screen.findByRole('heading', {
      level: 1,
      name: 'Instruções',
    });
    expect(titleInstructions).toBeInTheDocument();

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  it('Verifica se a tela contem recomendações', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const titleRecommendations = await screen.findByRole('heading', {
      level: 1,
      name: 'Recomendadas',
    });
    expect(titleRecommendations).toBeInTheDocument();

    expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('2-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('3-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('4-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('5-recomendation-card')).toBeInTheDocument();
    expect(screen.queryByTestId('6-recomendation-card')).toBe(null);
  });

  it('Verifica se a tela contem botão de compartilhar link e favoritar', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteBUtton = await screen.findByTestId('favorite-btn');
    expect(favoriteBUtton).toBeInTheDocument();
  });

  it('Verifica se o botão inicia desativado', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const finishRecipe = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipe).toBeDisabled();
  });

  it('Verifica se o botão fica ativo se'
  + 'todos os ingredientes estão marcados', async () => {
    renderWithRouterAndRedux(<RecipeProgress />);

    const checkbox = await screen.findAllByRole('checkbox');
    checkbox.forEach((check) => userEvent.click(check));

    const finishRecipe = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipe).not.toBeDisabled();

    userEvent.click(checkbox[0]);
    expect(finishRecipe).toBeDisabled();

    userEvent.click(checkbox[0]);
    expect(finishRecipe).not.toBeDisabled();
    userEvent.click(finishRecipe);
  });
});
