import React from 'react';
import renderWithStoreAndRouter from '../helpers/renderWithStoreAndRouter';
import Meals from '../pages/Meals';

describe('Foods', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<Meals />);
  });
});
