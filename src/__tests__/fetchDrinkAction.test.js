import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchDrinkThunk from '../redux/actions/fetchDrinkAction';
import { FETCH_API } from '../redux/actions/index';
import { fetchDrinksByIngredients } from '../TestsMocks/mockDrinkRecipes';
import {
  fetchCocktailInitialRecipes,
  fetchSearchByNameMargarita,
  fetchDrinkByFirstLetterA,
} from '../TestsMocks/mockInitialDrinks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

const TWELVE = 12;

describe('fetchDrinkActions.js first part', () => {
  test('async fetchDrinkAction creation action without input', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchCocktailInitialRecipes }),
    }));
    const expectedInitialActions = [{
      type: FETCH_API, payload: { recipes: fetchCocktailInitialRecipes.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchDrinkThunk('', '')).then(() => {
      expect(store.getActions()).toEqual(expectedInitialActions);
    });
  });

  test('async fetchDrinkAction creation action with type name', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchSearchByNameMargarita }),
    }));
    const expectedNameActions = [{
      type: FETCH_API, payload: { recipes: fetchSearchByNameMargarita },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchDrinkThunk('margarita', 'name')).then(() => {
      expect(store.getActions()).toEqual(expectedNameActions);
    });
  });
});

describe('fetchDrinkActions.js second part', () => {
  test('async fetchDrinkAction creation action with type ingredients', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchDrinksByIngredients }),
    }));
    const expectedIngredientsActions = [{
      type: FETCH_API, payload: { recipes: fetchDrinksByIngredients.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchDrinkThunk('gin', 'ingredient')).then(() => {
      expect(store.getActions()).toEqual(expectedIngredientsActions);
    });
  });

  test('async fetchDrinkAction creation action with type first-name', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchDrinkByFirstLetterA }),
    }));
    const expectedFirstLetterActions = [{
      type: FETCH_API, payload: { recipes: fetchDrinkByFirstLetterA.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchDrinkThunk('a', 'first-letter')).then(() => {
      expect(store.getActions()).toEqual(expectedFirstLetterActions);
    });
  });

  test('async fetchDrinkAction creation action with no return', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: null }),
    }));
    const expectedNotFetchedActions = [{
      type: FETCH_API, payload: { recipes: [] },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchDrinkThunk('x', 'first-letter')).then(() => {
      expect(store.getActions()).toEqual(expectedNotFetchedActions);
    });
  });
});
