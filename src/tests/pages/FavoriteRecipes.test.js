import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import FavoriteRecipes from '../../pages/FavoriteRecipes';

describe('FavoriteRecipes', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<FavoriteRecipes />);
  });
});
