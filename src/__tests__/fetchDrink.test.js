import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchDrinkActionId from '../redux/actions/fetchDrink';
import { FETCH_RECIPE_ID } from '../redux/actions/index';
import { dryMartiniSingleRecipe } from '../TestsMocks/singleDrinkRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchDrink.js', () => {
  test('async fetchDrink creation action', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: dryMartiniSingleRecipe }),
    }));
    const expectedActions = [{
      type: FETCH_RECIPE_ID, payload: { recipe: dryMartiniSingleRecipe },
    }];

    const store = mockStore({ singleRecipe: '' });

    return store.dispatch(fetchDrinkActionId('11005')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
