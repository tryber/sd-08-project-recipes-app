import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from './testConfig';
import App from '../App';

describe('Login page', () => {
  it('path name is "/"', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndStore(<App />);
    expect(pathname).toBe('/');

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
