import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Explore from '../containers/Explore';
import App from '../App';

describe('The elements of the profile page', () => {
  it('Shows the profile screen when the route is `/explorar`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    expect(history.location.pathname).toBe('/explorar');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Explore />);
    const pageTitle = getByTestId('page-title');
    const explorarPage = getByRole('heading', { name: /explorar/i });
    expect(pageTitle).toBeInTheDocument();
    expect(explorarPage).toBeInTheDocument();
  });
  it('should have a button Explorar Comidas e Explorar Bebidas', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const buttonExploreFoods = getByTestId('explore-food');
    const buttonExploreDrinks = getByTestId('explore-drinks');
    expect(buttonExploreFoods).toBeInTheDocument();
    expect(buttonExploreDrinks).toBeInTheDocument();
  });
  it('clicking on the `Explorar Comidas` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<Explore />);
    userEvent.click(getByText(/explorar comidas/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });
  it('clicking on the `Explorar Bebidas` takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<Explore />);
    userEvent.click(getByText(/explorar bebidas/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
  it('should have a footer on the component', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('should have a drink image that leads to the drink recipes', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const buttonDrinks = getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('should have an image that leads to the page to explore recipes', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const ButtonExplore = getByTestId('explore-bottom-btn');
    expect(ButtonExplore).toBeInTheDocument();
  });
  it('there should be an image that leads to the food page', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const ButtonFood = getByTestId('food-bottom-btn');
    expect(ButtonFood).toBeInTheDocument();
  });
});
