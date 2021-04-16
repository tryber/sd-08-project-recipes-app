import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMealActionId from '../redux/actions/fetchMealId';
import { FETCH_RECIPE_ID } from '../redux/actions/index';
import { ArrabiataSingleRecipe } from '../TestsMocks/singleMealRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchMealId.js', () => {
  test('async fetchMealId creation action', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: ArrabiataSingleRecipe }),
    }));
    const expectedActions = [{
      type: FETCH_RECIPE_ID, payload: { recipe: ArrabiataSingleRecipe },
    }];

    const store = mockStore({ singleRecipe: '' });

    return store.dispatch(fetchMealActionId('52771')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
