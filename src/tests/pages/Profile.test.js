import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import ProgressRecipe from '../../pages/ProgressRecipe';

describe('ProgressRecipe', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<ProgressRecipe />);
  });
});
