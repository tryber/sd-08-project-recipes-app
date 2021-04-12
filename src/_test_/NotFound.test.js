import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import NotFound from '../Pages/NotFound';

describe('<NotFound />', () => {
  it('Verifica se a url errada, renderiza a tela notfound', () => {
    renderWithRouterAndRedux(<NotFound />, {
      initialEntries: ['/explorar/bebidas/area'],
    });

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
