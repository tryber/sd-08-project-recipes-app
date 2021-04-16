import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CLEAR_RANDOM, FETCH_RANDOM_RECIPE, RANDOM_RECIPE } from '../redux/actions/index';
import {
  fetchRandomMealAction,
  fetchRandomDrinkAction,
  randomRecipeAction,
  clearRandom,
} from '../redux/actions/randomRecipes';
import { ArrabiataSingleRecipe } from '../TestsMocks/singleMealRecipe';
import { dryMartiniSingleRecipe } from '../TestsMocks/singleDrinkRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// afterEach(() => {
//   global.fetch.mockClear();
//   delete global.fetch;
// });

describe('randomRecipes.js first part', () => {
  test('async fetchRandomMealAction creation action', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: ArrabiataSingleRecipe }),
    }));
    const expectedRandomMealActions = [{
      type: FETCH_RANDOM_RECIPE, payload: { random: ArrabiataSingleRecipe },
    }];

    const store = mockStore({ singleRecipe: '' });

    return store.dispatch(fetchRandomMealAction()).then(() => {
      expect(store.getActions()).toEqual(expectedRandomMealActions);
      global.fetch.mockClear();
      delete global.fetch;
    });
  });

  test('async fetchRandomDrinkAction creation action', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: dryMartiniSingleRecipe }),
    }));
    const expectedRandomDrinkActions = [{
      type: FETCH_RANDOM_RECIPE, payload: { random: dryMartiniSingleRecipe },
    }];

    const store = mockStore({ singleRecipe: '' });

    return store.dispatch(fetchRandomDrinkAction()).then(() => {
      expect(store.getActions()).toEqual(expectedRandomDrinkActions);
      global.fetch.mockClear();
      delete global.fetch;
    });
  });
});

describe('randomRecipes.js second part', () => {
  test('randomRecipe creation action', () => {
    const expectedRandomAction = { type: RANDOM_RECIPE };

    expect(randomRecipeAction()).toEqual(expectedRandomAction);
  });

  test('clearRandom creation action', () => {
    const expectedClearRandomAction = { type: CLEAR_RANDOM };

    expect(clearRandom()).toEqual(expectedClearRandomAction);
  });
});
