import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import Profile from '../../pages/Profile';

const INITIAL_STATE = {
  user: {
    email: 'email@email.com',
    isAuthenticated: true,
  },
};

describe('Profile', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<Profile />, { initialState: INITIAL_STATE });
  });
});
