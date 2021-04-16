import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../containers/Profile';
import App from '../App';

describe('The elements of the profile page', () => {
  it('Shows the profile screen when the route is `/perfil`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    expect(history.location.pathname).toBe('/perfil');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Profile />);
    const pageTitle = getByTestId('page-title');
    const profilePage = getByRole('heading', { name: /perfil/i });
    expect(pageTitle).toBeInTheDocument();
    expect(profilePage).toBeInTheDocument();
  });
  it('should have a profile email address button', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const emailProfile = getByTestId('profile-email');
    expect(emailProfile).toBeInTheDocument();
  });
  it('should have a button Receitas Feitas, Receitas Favoritas and Sair', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const buttonRecipesDone = getByTestId('profile-done-btn');
    const buttonFavoriteRecipes = getByTestId('profile-favorite-btn');
    const buttonLogout = getByTestId('profile-logout-btn');
    expect(buttonRecipesDone).toBeInTheDocument();
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
  });
  it('clicking on the `Receitas Feitas` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<Profile />);
    userEvent.click(getByText(/receitas feitas/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });
  it('clicking on the `Receitas Favoritas` takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<Profile />);
    userEvent.click(getByText(/receitas favoritas/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });
  it('clicking the `Sair` button takes you to the Login page', () => {
    const { history, getByText } = renderWithRouter(<Profile />);
    userEvent.click(getByText(/sair/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('should have a footer on the component', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('should have a drink image that leads to the drink recipes', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const buttonDrinks = getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('should have an image that leads to the page to explore recipes', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const ButtonExplore = getByTestId('explore-bottom-btn');
    expect(ButtonExplore).toBeInTheDocument();
  });
  it('there should be an image that leads to the food page', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const ButtonFood = getByTestId('food-bottom-btn');
    expect(ButtonFood).toBeInTheDocument();
  });
});
