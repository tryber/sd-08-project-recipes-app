import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import recomendationThunkDrinks from '../redux/actions/recomendationDrinks';
import { FETCH_RECOMENDATION } from '../redux/actions/index';
import { fetchCocktailInitialRecipes } from '../TestsMocks/mockInitialDrinks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

const SIX = 6;

describe('recomendationAction.js', () => {
  test('async recomendationAction creation action', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchCocktailInitialRecipes }),
    }));
    const expectedRecomendationActions = [{
      type: FETCH_RECOMENDATION, payload: fetchCocktailInitialRecipes.slice(0, SIX),
    }];

    const store = mockStore({ recomendation: [] });

    return store.dispatch(recomendationThunkDrinks()).then(() => {
      expect(store.getActions()).toEqual(expectedRecomendationActions);
    });
  });

  test('async recomendationAction creation action with less result', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchCocktailInitialRecipes.slice(1, SIX) }),
    }));
    const expectedRecomendationActions = [{
      type: FETCH_RECOMENDATION, payload: fetchCocktailInitialRecipes.slice(1, SIX),
    }];

    const store = mockStore({ recomendation: [] });

    return store.dispatch(recomendationThunkDrinks()).then(() => {
      expect(store.getActions()).toEqual(expectedRecomendationActions);
    });
  });
});
