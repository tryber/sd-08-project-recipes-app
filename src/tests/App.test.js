import React from 'react';
import renderWithStoreAndRouter from '../helpers/renderWithStoreAndRouter';
import App from '../App';

describe('App', () => {
  test('O componente renderiza com sucesso', () => {
    renderWithStoreAndRouter(<App />);
  });
});
