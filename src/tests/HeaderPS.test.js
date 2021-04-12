import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import HeaderPS from '../components/HeaderPS';

describe('Component HeaderPS', () => {
  test('there is profile btn element', () => {
    renderWithRouter(<HeaderPS />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('the title is rendered', () => {
    renderWithRouter(<HeaderPS />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  test('there is search btn element', () => {
    renderWithRouter(<HeaderPS />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
  });
});
