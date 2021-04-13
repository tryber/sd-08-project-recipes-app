import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import RecipeDetails from '../pages/RecipeDetails';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(() => { global.fetch = jest.fn(fetchMock); });
afterEach(() => jest.clearAllMocks());
describe('Recipe Details', () => {
  it('meals details', async () => {
    const pathname = '/comidas/52771';
    const props = { match: { params: { id: '52771' } },
      location: { pathname } };
    renderWithRouterAndStore(<RecipeDetails { ...props } />, { route: pathname });

    const [picture] = await screen.findAllByRole('img');
    expect(picture).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const title = screen.getByRole('heading',
      { level: 1, name: 'Spicy Arrabiata Penne' });
    expect(title).toBeInTheDocument();
    const shareButton = screen.getByAltText('share');
    expect(shareButton).toBeInTheDocument();
    const favButton = screen.getByAltText('favorite');
    expect(favButton).toBeInTheDocument();
    const category = screen.getByRole('heading',
      { level: 2, name: 'Vegetarian' });
    expect(category).toBeInTheDocument();
    const ingredients = screen.getByRole('list');
    const ingredientsLength = 8;
    expect(ingredients.children).toHaveLength(ingredientsLength);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const video = screen.getByTitle(/video/i);
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
    const recommendationLength = 6;
    const recommendations = screen.getAllByTestId(/.-recomendation-card/);
    expect(recommendations).toHaveLength(recommendationLength);
    const startButton = screen.getByRole('button', { name: /iniciar receita/i });
    expect(startButton).toBeInTheDocument();
  });

  it('drinks details', async () => {
    const props = { match: { params: { id: '178319' } },
      location: { pathname: '/bebidas/178319' } };
    renderWithRouterAndStore(<RecipeDetails { ...props } />,
      { route: '/bebidas/178319' });

    const [picture] = await screen.findAllByRole('img');
    expect(picture).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const title = screen.getByRole('heading',
      { level: 1, name: 'Aquamarine' });
    expect(title).toBeInTheDocument();
    const shareButton = screen.getByAltText('share');
    expect(shareButton).toBeInTheDocument();
    const favButton = screen.getByAltText('favorite');
    expect(favButton).toBeInTheDocument();
    const category = screen.getByRole('heading',
      { level: 2, name: 'Alcoholic Cocktail' });
    expect(category).toBeInTheDocument();
    const ingredients = screen.getByRole('list');
    const ingredientsLength = 3;
    expect(ingredients.children).toHaveLength(ingredientsLength);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const video = screen.queryByTitle(/video/i);
    expect(video).not.toBeInTheDocument();
    const recommendationLength = 6;
    const recommendations = screen.getAllByTestId(/.-recomendation-card/);
    expect(recommendations).toHaveLength(recommendationLength);
    const startButton = screen.getByRole('button', { name: /iniciar receita/i });
    expect(startButton).toBeInTheDocument();
  });

  it('in progress recipe', async () => {
    const pathname = '/comidas/52771/in-progress';
    const props = { match: { params: { id: '52771' } },
      location: { pathname } };
    renderWithRouterAndStore(<RecipeDetails { ...props } />, { route: pathname });
    const finishButton = await screen
      .findByRole('button', { name: /finalizar receita/i });
    expect(finishButton).toBeDisabled();
    const ingredients = screen.getAllByRole('checkbox');
    const ingredientsLength = 8;
    expect(ingredients).toHaveLength(ingredientsLength);
    ingredients.forEach((ingredient) => userEvent.click(ingredient));
    expect(finishButton).not.toBeDisabled();
  });
  it('Favorite recipe', async () => {
    const pathname = '/comidas/52771';
    const props = { match: { params: { id: '52771' } },
      location: { pathname } };
    const { store } = renderWithRouterAndStore(
      <RecipeDetails { ...props } />, { route: pathname },
    );
    const favButton = await screen.findByTestId('favorite-btn');
    expect(favButton).toBeInTheDocument();
    expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favButton);
    expect(store.getState().recipes.favorite).toHaveLength(1);
    expect(favButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favButton);
    expect(store.getState().recipes.favorite).toHaveLength(0);
    expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
