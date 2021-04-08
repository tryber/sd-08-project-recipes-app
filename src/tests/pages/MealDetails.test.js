import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import MealsDetails from '../../pages/MealsDetails';

describe('MealsDetails', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<MealsDetails />);
  });
});
