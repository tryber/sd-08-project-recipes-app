import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import recomendationThunk from '../redux/actions/recomendationAction';
import { FETCH_RECOMENDATION } from '../redux/actions/index';
import { fetchMealInitialRecipes } from '../TestsMocks/mockInitialMeal';

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
      json: () => Promise.resolve({ meals: fetchMealInitialRecipes }),
    }));
    const expectedRecomendationActions = [{
      type: FETCH_RECOMENDATION, payload: fetchMealInitialRecipes.slice(0, SIX),
    }];

    const store = mockStore({ recomendation: [] });

    return store.dispatch(recomendationThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedRecomendationActions);
    });
  });

  test('async recomendationAction creation action with less result', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchMealInitialRecipes.slice(1, SIX) }),
    }));
    const expectedRecomendationActions = [{
      type: FETCH_RECOMENDATION, payload: fetchMealInitialRecipes.slice(1, SIX),
    }];

    const store = mockStore({ recomendation: [] });

    return store.dispatch(recomendationThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedRecomendationActions);
    });
  });
});
