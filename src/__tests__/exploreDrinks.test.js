import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import ExploreDrinks from '../containers/ExploreDrinks';
import App from '../App';

describe('The elements of the Explore Drinks page', () => {
  it('Shows the profile screen when the route is `/explorar/bebidas`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<ExploreDrinks />);
    const pageTitle = getByTestId('page-title');
    const profilePage = getByRole('heading', { name: /explorar bebidas/i });
    expect(pageTitle).toBeInTheDocument();
    expect(profilePage).toBeInTheDocument();
  });
  it('should have a button `Por Ingredientes`', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const buttonIngredients = getByTestId('explore-by-ingredient');
    expect(buttonIngredients).toBeInTheDocument();
  });
  it('should have a button `Me Surpreenda`', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const buttonSurprise = getByTestId('explore-surprise');
    expect(buttonSurprise).toBeInTheDocument();
  });
  it('clicking the `Me Surpreenda` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreDrinks />);
    userEvent.click(getByText(/me surpreenda/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });
  it('clicking on the `Por Ingredientes` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreDrinks />);
    userEvent.click(getByText(/por ingredientes/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
  it('should have a footer on the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('should have a drink image that leads to the drink recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const buttonDrinks = getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('should have an image that leads to the page to explore recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const ButtonExplore = getByTestId('explore-bottom-btn');
    expect(ButtonExplore).toBeInTheDocument();
  });
  it('there should be an image that leads to the food page', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const ButtonFood = getByTestId('food-bottom-btn');
    expect(ButtonFood).toBeInTheDocument();
  });
});
