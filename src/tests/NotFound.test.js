import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testar se o componente <NotFound/>', () => {
  it('Teste se a página não adquirir os dados da api', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });
});
