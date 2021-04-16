import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import ExploreFoods from '../containers/ExploreFoods';
import App from '../App';

describe('The elements of the Explore Foods page', () => {
  it('Shows the profile screen when the route is `/explorar/comida`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comida');
    expect(history.location.pathname).toBe('/explorar/comida');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<ExploreFoods />);
    const pageTitle = getByTestId('page-title');
    const profilePage = getByRole('heading', { name: /explorar comidas/i });
    expect(pageTitle).toBeInTheDocument();
    expect(profilePage).toBeInTheDocument();
  });
  it('should have a button `Por Ingredientes`', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const buttonIngredients = getByTestId('explore-by-ingredient');
    expect(buttonIngredients).toBeInTheDocument();
  });
  it('should have a button `Por local de Origem`', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const buttonArea = getByTestId('explore-by-area');
    expect(buttonArea).toBeInTheDocument();
  });
  it('should have a button `Me Surpreenda`', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const buttonSurprise = getByTestId('explore-surprise');
    expect(buttonSurprise).toBeInTheDocument();
  });
  it('clicking on the `Por Ingredientes` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreFoods />);
    userEvent.click(getByText(/por ingredientes/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('clicking on the `Por local de Origem` takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreFoods />);
    userEvent.click(getByText(/por local de origem/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('clicking the `Me Surpreenda` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreFoods />);
    userEvent.click(getByText(/me surpreenda/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });
  it('should have a footer on the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('should have a drink image that leads to the drink recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const buttonDrinks = getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('should have an image that leads to the page to explore recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const ButtonExplore = getByTestId('explore-bottom-btn');
    expect(ButtonExplore).toBeInTheDocument();
  });
  it('there should be an image that leads to the food page', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);
    const ButtonFood = getByTestId('food-bottom-btn');
    expect(ButtonFood).toBeInTheDocument();
  });
});
