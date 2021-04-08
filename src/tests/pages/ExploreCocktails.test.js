import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import ExploreCocktails from '../../pages/ExploreCocktails';

describe('ExploreCocktails', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<ExploreCocktails />);
  });
});
