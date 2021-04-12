import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../containers/DoneRecipes';
import App from '../App';

describe('The elements of the made recipes done', () => {
  it('Show the Recipes Made screen if the route is `/receitas-feitas`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<DoneRecipes />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<DoneRecipes />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<DoneRecipes />);
    const pageTitle = getByTestId('page-title');
    const recipesDone = getByRole('heading', { name: /receitas feitas/i });
    expect(pageTitle).toBeInTheDocument();
    expect(recipesDone).toBeInTheDocument();
  });
  it('should have a button All, Food e Drinks', () => {
    const { getByRole } = renderWithRouter(<DoneRecipes />);
    const buttonAll = getByRole('button', { name: /all/i });
    const buttonFood = getByRole('button', { name: /food/i });
    const buttonDrinks = getByRole('button', { name: /food/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonFood).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });
});
