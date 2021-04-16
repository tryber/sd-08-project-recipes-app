import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';

import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../containers/NotFound';

describe('NotFound.jsx container', () => {
  beforeEach(cleanup);

  it('should render', () => {
    renderWithRouter(<NotFound />);
  });
});
