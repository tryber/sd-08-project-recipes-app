import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchDrinkCatsThunk from '../redux/actions/fetchDrinkCatsAction';
import { FETCH_CATEGORIES } from '../redux/actions/index';
import { fetchInitialCategoryDrink } from '../TestsMocks/mockDrinkRecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchDrinkCatAction.js', () => {
  test('async fetchDrinkCatsAction creation action with filter', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(fetchInitialCategoryDrink),
    }));
    const expectedActions = [{
      type: FETCH_CATEGORIES, payload: { categories: fetchInitialCategoryDrink },
    }];

    const store = mockStore({ categories: [] });

    return store.dispatch(fetchDrinkCatsThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
