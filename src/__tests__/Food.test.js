import React from 'react';
import renderWithRouter from '../routes/renderWithRouter';

import ContextFood from '../context/ContextFood';

import Food from '../pages/Foods/Foods';

const setup = () => {
  const utils = renderWithRouter(
    <ContextFood>
      <Food location={ {} } />
    </ContextFood>,
  );
  const header = utils.getByRole('banner');
  const title = utils.getByTestId('page-title');
  const searchIcon = utils.getByTestId('search-top-btn');
  const categoryDiv = utils.getByTestId('All-category-filter');

  return {
    header,
    title,
    categoryDiv,
    searchIcon,
    ...utils,
  };
};

describe('Test Page Food', () => {
  it('should have header', () => {
    const { header } = setup();
    expect(header).toBeInTheDocument();
  });
  it('shou title tobe Comidas', () => {
    const { title } = setup();

    expect(title.innerHTML).toMatch(/comidas/gi);
  });
});
