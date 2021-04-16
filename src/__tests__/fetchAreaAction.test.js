import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchAreaThunk from '../redux/actions/fetchAreaAction';
import { FETCH_AREA_API } from '../redux/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchAreaActions.js', () => {
  test('async fetchArea creation action', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: ['areas'] }),
    }));
    const expectedActions = [{ type: FETCH_AREA_API, payload: { area: ['areas'] } }];

    const store = mockStore({ areas: [] });

    return store.dispatch(fetchAreaThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
