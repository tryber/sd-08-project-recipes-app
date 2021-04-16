import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ExploreDrinksBysIngredients from '../containers/ExploreDrinksByIngredients';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';

const TWELVE = 12;
describe('The elements of the page explore ingredients', () => {
  it('Show the explore by ingredients screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const pageTitle = getByTestId('page-title');
    const recipesDone = getByRole('heading', { name: /explorar ingredientes/i });
    expect(pageTitle).toBeInTheDocument();
    expect(recipesDone).toBeInTheDocument();
  });

  it('there should be 12 cards on the ingredients screen', async () => {
    const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    await act(async () => {
      renderWithRouter(<ExploreDrinksBysIngredients />);
    });
    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
    }
    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(1);
  });

  it('should have a footer on the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('should have a drink image that leads to the drink recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const buttonDrinks = getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('should have an image that leads to the page to explore recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const ButtonExplore = getByTestId('explore-bottom-btn');
    expect(ButtonExplore).toBeInTheDocument();
  });
  it('there should be an image that leads to the food page', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksBysIngredients />);
    const ButtonFood = getByTestId('food-bottom-btn');
    expect(ButtonFood).toBeInTheDocument();
  });
});
