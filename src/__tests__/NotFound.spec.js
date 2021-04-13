import React from 'react';
import { render } from '@testing-library/react';

import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  test('81 - Implemente a rota que deve ser apenas /explorar/comidas/area', () => {
    const {queryByText} = render(<NotFound />);

    expect(queryByText('Not Found')).toBeInTheDocument();
  });
})