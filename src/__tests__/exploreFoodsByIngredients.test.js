import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ExploreFoodsBysIngredients from '../containers/ExploreFoodsByIngredients';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';

const TWELVE = 12;
describe('The elements of the page explore ingredients', () => {
  it('Show the explore by ingredients screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('should have a header in the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const headerContainer = getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();
  });
  it('should have a profile button in the header', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('should have a title in the header', () => {
    const { getByTestId, getByRole } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const pageTitle = getByTestId('page-title');
    const recipesDone = getByRole('heading', { name: /explorar ingredientes/i });
    expect(pageTitle).toBeInTheDocument();
    expect(recipesDone).toBeInTheDocument();
  });

  it('there should be 12 cards on the ingredients screen', async () => {
    const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    await act(async () => {
      renderWithRouter(<ExploreFoodsBysIngredients />);
    });
    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
    }
    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(1);
  });

  it('should have a footer on the component', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('should have a drink image that leads to the drink recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const buttonDrinks = getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('should have an image that leads to the page to explore recipes', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const ButtonExplore = getByTestId('explore-bottom-btn');
    expect(ButtonExplore).toBeInTheDocument();
  });
  it('there should be an image that leads to the food page', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodsBysIngredients />);
    const ButtonFood = getByTestId('food-bottom-btn');
    expect(ButtonFood).toBeInTheDocument();
  });
});
