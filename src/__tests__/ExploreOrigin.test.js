import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

import {
  fetchMealSearchArea, fetchChineseOptionRecipes,
} from '../TestsMocks/mockSearchArea';
import { initialSearch } from '../TestsMocks/mockEmptySearch';

const ENTRIE_AREA = '/explorar/comidas/area';

describe('ExploreOrigin.js', () => {
  test('if the explore food by area render', () => {
    const recipes = {
      recipes: fetchChineseOptionRecipes,
      categories: {},
      ingredients: [],
    };
    const search = {
      ...initialSearch,
      areaChoosen: 'Chinese',
      areas: fetchMealSearchArea,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_AREA],
      initialState: {
        recipes,
        search,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe(ENTRIE_AREA);

    const exploreSearchAreaBtn = screen.getByTestId('explore-by-area-dropdown');
    expect(exploreSearchAreaBtn).toBeInTheDocument();
    const exploreChinese = screen.getByTestId('Chinese-option');
    userEvent.click(exploreChinese);

    const firstCardName = screen.getByTestId('0-card-name');
    expect(firstCardName).toHaveTextContent('Beef Lo Mein');

    const firstCard = screen.getByTestId('0-recipe-card');
    userEvent.click(firstCard);

    expect(history.location.pathname).toBe('/comidas/52952');
  });

  test('if the explore option is all', () => {
    const recipes = {
      recipes: fetchChineseOptionRecipes,
      categories: {},
      ingredients: [],
    };
    const search = {
      ...initialSearch,
      areas: fetchMealSearchArea,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_AREA],
      initialState: {
        recipes,
        search,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });
});
