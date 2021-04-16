import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMealThunk from '../redux/actions/fetchMealAction';
import { FETCH_API } from '../redux/actions/index';
import { fetchSalmonIngredientRecipes } from '../TestsMocks/mockMealrecipes';
import {
  fetchMealInitialRecipes,
  fetchSearchByNameSoup,
  fetchMealByFirstLetterA,
  fetchMealByAreaCanada,
} from '../TestsMocks/mockInitialMeal';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

const TWELVE = 12;

describe('fetchMealActions.js first part', () => {
  test('async fetchMealActions creation action without input', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchMealInitialRecipes }),
    }));
    const expectedInitialActions = [{
      type: FETCH_API, payload: { recipes: fetchMealInitialRecipes.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealThunk('', '')).then(() => {
      expect(store.getActions()).toEqual(expectedInitialActions);
    });
  });

  test('async fetchMealAction creation action with type name', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchSearchByNameSoup }),
    }));
    const expectedNameActions = [{
      type: FETCH_API, payload: { recipes: fetchSearchByNameSoup },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealThunk('soup', 'name')).then(() => {
      expect(store.getActions()).toEqual(expectedNameActions);
    });
  });
});

describe('fetchMealActions.js second part', () => {
  test('async fetchMealAction creation action with type ingredients', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchSalmonIngredientRecipes }),
    }));
    const expectedIngredientsActions = [{
      type: FETCH_API, payload: { recipes: fetchSalmonIngredientRecipes },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealThunk('Salmon', 'ingredient')).then(() => {
      expect(store.getActions()).toEqual(expectedIngredientsActions);
    });
  });

  test('async fetchMealAction creation action with type first-name', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchMealByFirstLetterA }),
    }));
    const expectedFirstLetterActions = [{
      type: FETCH_API, payload: { recipes: fetchMealByFirstLetterA },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealThunk('a', 'first-letter')).then(() => {
      expect(store.getActions()).toEqual(expectedFirstLetterActions);
    });
  });

  test('async fetchMealAction creation action with filter area', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchMealByAreaCanada }),
    }));
    const expectedAreaFetchedActions = [{
      type: FETCH_API, payload: { recipes: fetchMealByAreaCanada },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealThunk('Canadian', 'area')).then(() => {
      expect(store.getActions()).toEqual(expectedAreaFetchedActions);
    });
  });
});

describe('fetchMealActions.js third part', () => {
  test('async fetchMealAction creation action with no return', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: null }),
    }));
    const expectedNotFetchedActions = [{
      type: FETCH_API, payload: { recipes: [] },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealThunk('x', 'first-letter')).then(() => {
      expect(store.getActions()).toEqual(expectedNotFetchedActions);
    });
  });
});
