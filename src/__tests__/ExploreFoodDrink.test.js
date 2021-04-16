import React from 'react';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';
// import ExploreFoodDrink from '../pages/ExploreFoodDrink';
// import { dryMartiniSingleRecipe } from '../TestsMocks/singleDrinkRecipe';
import { ArrabiataSingleRecipe } from '../TestsMocks/singleMealRecipe';
// import { RANDOM_RECIPE, FETCH_RANDOM_RECIPE } from '../redux/actions/index';
// import { fetchRandomMealAction } from '../redux/actions/randomRecipes';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

const ENTRIE_EXPLORE_FOOD = '/explorar/comidas';

describe('Explore.js', () => {
  test('if the explore foodbtn redirect to the food explore page', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: [],
      singleRecipe: [],
      random: false,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_EXPLORE_FOOD],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe(ENTRIE_EXPLORE_FOOD);

    const exploreFoodByAreaBtn = screen.getByTestId('explore-by-area');
    userEvent.click(exploreFoodByAreaBtn);

    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  test('if the explore drinkbtn redirect to the drink explore page', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: [],
      singleRecipe: [],
      random: false,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/bebidas'],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/explorar/bebidas');

    const exploreDrinkBtn = screen.getByTestId('explore-by-ingredient');
    userEvent.click(exploreDrinkBtn);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  test('if the explore surpriseBtn redirect to the food detail page', () => {
    const recipes = {
      recipes: [],
      categories: {},
      ingredients: [],
      singleRecipe: ArrabiataSingleRecipe,
      random: true,
    };
    const INITIAL_ENTRIES = {
      initialEntries: [ENTRIE_EXPLORE_FOOD],
      initialState: {
        recipes,
      },
    };

    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    expect(history.location.pathname).toBe('/comidas/52771');
  });
});

// describe('Random action', () => {
//   test('if the random click create an action', () => {
//     const recipes = {
//       recipes: [],
//       categories: {},
//       ingredients: [],
//       singleRecipe: [],
//       random: false,
//     };
//     const INITIAL_ENTRIES = {
//       initialEntries: [ENTRIE_EXPLORE_FOOD],
//       initialState: {
//         recipes,
//       },
//     };
//     global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
//       json: () => Promise.resolve({ meals: ArrabiataSingleRecipe }),
//     }));
//     const expectedRandomActions = [{
//       type: FETCH_RANDOM_RECIPE, payload: { random: ArrabiataSingleRecipe },
//     }];
//     const store = mockStore({ recipes: [] });

//     const mockRandomClick = jest.fn();
//     renderWithReduxandRouter(
//       <LocalStorageMock items={ {} }>
//         <ExploreFoodDrink randomClick={ mockRandomClick } />
//       </LocalStorageMock>, INITIAL_ENTRIES,
//     );
//     const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
//     userEvent.click(exploreSurpriseBtn);
//     expect(mockRandomClick).toHaveBeenCalledTimes(0);
//     return store.dispatch(fetchRandomMealAction()).then(() => {
//       expect(store.getActions()).toEqual(expectedRandomActions);
//       global.fetch.mockClear();
//       delete global.fetch;
//     });
//   });
// });
