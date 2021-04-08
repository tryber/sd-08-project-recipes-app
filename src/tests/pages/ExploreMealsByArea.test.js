import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import ExploreMealsByIngredient from '../../pages/ExploreMealsByIngredient';

describe('ExploreMealsByIngredient', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<ExploreMealsByIngredient />);
  });
});
