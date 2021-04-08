import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import Cocktails from '../../pages/Cocktails';

describe('Cocktails', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<Cocktails />);
  });
});
