import { createStore } from 'redux';
import rootReducer from '../../../store/ducks';
import { Creators as UserActions } from '../../../store/ducks/user';

afterEach(jest.clearAllMocks);

describe('user reducer', () => {
  test('login', () => {
    const INITIAL_STATE = {
      user: {
        email: '',
        isAuthenticated: false,
      },
    };

    const VALID_EMAIL = 'user@email.com';

    const store = createStore(rootReducer, INITIAL_STATE);
    expect(store.getState().user.email).toBe('');
    expect(store.getState().user.isAuthenticated).not.toBeTruthy();
    store.dispatch(UserActions.login(VALID_EMAIL));
    expect(store.getState().user.email).toBe(VALID_EMAIL);
    expect(store.getState().user.isAuthenticated).toBeTruthy();
  });

  test('logout', () => {
    const VALID_EMAIL = 'user@email.com';
    const INITIAL_STATE = {
      user: {
        email: VALID_EMAIL,
        isAuthenticated: true,
      },
    };

    const store = createStore(rootReducer, INITIAL_STATE);
    expect(store.getState().user.email).toBe(VALID_EMAIL);
    expect(store.getState().user.isAuthenticated).toBeTruthy();
    store.dispatch(UserActions.logout());
    expect(store.getState().user.email).toBe('');
    expect(store.getState().user.isAuthenticated).not.toBeTruthy();
  });
});
