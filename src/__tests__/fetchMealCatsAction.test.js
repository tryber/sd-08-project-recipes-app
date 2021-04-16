import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchDrinkCatsThunk from '../redux/actions/fetchMealCatsAction';
import { FETCH_CATEGORIES } from '../redux/actions/index';
import { fetchInitialCategoryMeal } from '../TestsMocks/mockMealrecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchMealCatsAction.js', () => {
  test('async fetchMealCatsAction creation action with filter', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(fetchInitialCategoryMeal),
    }));
    const expectedActions = [{
      type: FETCH_CATEGORIES, payload: { categories: fetchInitialCategoryMeal },
    }];

    const store = mockStore({ categories: [] });

    return store.dispatch(fetchDrinkCatsThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
