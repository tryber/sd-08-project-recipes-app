import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './pages/Login';
import App from './App';
import renderWithRouterAndStore from './test.helper';

describe('Testando  o link /', () => {
  it('A página deve conter os inputs para o Login', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/login');
    expect(email).toBeInTheDocument();
    expect(email.tagName).toBe('input');
  });
});
