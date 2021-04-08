import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import ExploreCocktailsByIngredient from '../../pages/ExploreCocktailsByIngredient';

describe('ExploreCocktailsByIngredient', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<ExploreCocktailsByIngredient />);
  });
});
