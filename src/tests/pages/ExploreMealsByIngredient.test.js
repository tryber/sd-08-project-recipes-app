import React from 'react';
import renderWithStoreAndRouter from '../../helpers/renderWithStoreAndRouter';
import ExploreMealsByArea from '../../pages/ExploreMealsByArea';

describe('ExploreMealsByArea', () => {
  test('O componente é renderizado', () => {
    renderWithStoreAndRouter(<ExploreMealsByArea />);
  });
});
