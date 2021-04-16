import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import LikeButton from '../components/LikeButton';
import { dryMartiniSingleRecipe } from '../TestsMocks/singleDrinkRecipe';

const DRINK_ENTRIES = '/bebidas/11005';

describe('LikeButton.js', () => {
  test('if handle click function to disliked it', () => {
    const recipes = {
      singleRecipe: dryMartiniSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [DRINK_ENTRIES],
      initialState: {
        recipes,
      },
    };
    const storage = [{
      alcoholicOrNot: 'Alcoholic',
      area: '',
      category: 'Cocktail',
      id: '11005',
      image: 'https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg',
      name: 'Dry Martini',
      type: 'bebida',
    }];
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON.stringify(storage),
        } }
      >
        <LikeButton />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe(DRINK_ENTRIES);

    const button = screen.getByTestId('favorite-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  test('if handle click function to liked it', () => {
    const recipes = {
      singleRecipe: dryMartiniSingleRecipe,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [DRINK_ENTRIES],
      initialState: {
        recipes,
      },
    };
    const storage = [];
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock
        items={ {
          favoriteRecipes: JSON.stringify(storage),
        } }
      >
        <LikeButton />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe(DRINK_ENTRIES);

    const button = screen.getByTestId('favorite-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
