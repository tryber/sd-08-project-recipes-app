import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import DoneRecipes from '../../pages/DoneRecipes';

describe('DoneRecipes', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<DoneRecipes />);
  });
});
