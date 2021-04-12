import React from 'react';
import { screen } from '@testing-library/react';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Details from '../Pages/Details/Details';

const THIRTEEN = 13;

describe('<Details />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('Verifica se a receita está sendo renderizada na tela', async () => {
    renderWithRouterAndRedux(<Details />);

    const recipeTest = await screen.findByTestId('recipe-title');
    expect(recipeTest.innerHTML).toBe('Corba');
  });

  it('Verifica se a tela contem ingredientes', async () => {
    renderWithRouterAndRedux(<Details />);

    const titleIngredients = await screen.findByRole('heading', {
      level: 1,
      name: 'Ingredientes',
    });
    expect(titleIngredients).toBeInTheDocument();

    for (let index = 0; index < THIRTEEN; index += 1) {
      expect(screen
        .getByTestId(`${index}-ingredient-name-and-measure`)).toBeInTheDocument();
    }
  });

  it('Verifica se a tela contem instruções', async () => {
    renderWithRouterAndRedux(<Details />);

    const titleInstructions = await screen.findByRole('heading', {
      level: 1,
      name: 'Instruções',
    });
    expect(titleInstructions).toBeInTheDocument();

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  it('Verifica se a tela contem recomendações', async () => {
    renderWithRouterAndRedux(<Details />);

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
    renderWithRouterAndRedux(<Details />, {
      initialEntries: ['/comidas/52977'],
    });

    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });
});
