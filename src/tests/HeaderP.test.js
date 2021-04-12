import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import HeaderP from '../components/HeaderP';

describe('Component HeaderP', () => {
  test('there is profile btn element', () => {
    renderWithRouter(<HeaderP />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('the title is rendered', () => {
    renderWithRouter(<HeaderP />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  test('there is no search btn element', () => {
    renderWithRouter(<HeaderP />);

    const searchTopBtn = screen.getAllByRole('img');
    expect(searchTopBtn.length).toBe(1);
  });
});
