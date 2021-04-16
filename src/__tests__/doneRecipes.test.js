import React from 'react';
import userEvent from '@testing-library/user-event';
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
  it('clicking on All Buttton takes you to the done recipes page', () => {
    const { getByText, getByRole } = renderWithRouter(<DoneRecipes />);
    userEvent.click(getByText(/all/i));
    const doneFood = getByRole('heading', { name: /spicy arrabiata penne/i });
    const doneDrink = getByRole('img', { name: /bebida aquamarine/i });
    expect(doneFood).toBeInTheDocument();
    expect(doneDrink).toBeInTheDocument();
  });
  it('clicking on Food Buttton should only appear the foods made', () => {
    const { getByText, getByTestId } = renderWithRouter(<DoneRecipes />);
    const doneFood = getByTestId('0-horizontal-top-text');
    const doneDrink = getByTestId('1-horizontal-top-text');
    userEvent.click(getByText(/all/i));
    expect(doneFood).toBeInTheDocument();
    expect(doneDrink).toBeInTheDocument();
    userEvent.click(getByText(/food/i));
    expect(doneFood).toBeInTheDocument();
    expect(doneDrink).not.toBeInTheDocument();
  });
  it('clicking on Drink Buttton should only appear the Drinks made', () => {
    const { getByText, getByTestId } = renderWithRouter(<DoneRecipes />);
    const doneFood = getByTestId('0-horizontal-top-text');
    const doneDrink = getByTestId('1-horizontal-top-text');
    userEvent.click(getByText(/all/i));
    expect(doneFood).toBeInTheDocument();
    expect(doneDrink).toBeInTheDocument();
    userEvent.click(getByText(/drinks/i));
    expect(doneFood).not.toBeInTheDocument();
    expect(doneDrink).toBeInTheDocument();
  });
});
