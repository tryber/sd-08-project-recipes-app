import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import renderWithRouter from './renderWithRouter';

describe('App.js', () => {
  test('se a página Login contém os seguintes Inputs', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-submit-btn")).toBeInTheDocument();
  })
});
