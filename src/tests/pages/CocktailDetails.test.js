import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import CocktailDetails from '../../pages/CocktailDetails';

describe('CocktailDetails', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<CocktailDetails />);
  });
});
