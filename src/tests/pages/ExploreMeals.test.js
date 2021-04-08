import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import ExploreMeals from '../../pages/ExploreMeals';

describe('ExploreMeals', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<ExploreMeals />);
  });
});
