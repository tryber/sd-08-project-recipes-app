import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import { renderWithRouterAndStore } from './testConfig';
import App from '../App';
import Profile from '../pages/Profile';

describe('Profile page', () => {
  it('path name is  perfil and be located at "src/pages"', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/perfil');
    expect(history.location.pathname).toBe('/perfil');

    const { container } = renderWithRouterAndStore(<Profile />, '/perfil', {});
    expect(container).toBeDefined();
  });

  it('shows the email used in login', () => {
    const { store } = renderWithRouterAndStore(<App />, '/perfil');
    const emailField = screen.getByTestId('email-input');
    expect(emailField).toContainHTML(store.getState().login.email);
  });

  it('has a button to redirect to /receitas-feitas', () => {
    const { history } = renderWithRouterAndStore(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();
    fireEvent.click(doneButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  it('has a button to redirect to /receitas-favoritas', () => {
    const { history } = renderWithRouterAndStore(<Profile />);
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });

  it('has a button "sair" to redirect to /login', () => {
    const { history } = renderWithRouterAndStore(<Profile />);
    const exitButton = screen.getByTestId('profile-logout-btn');
    expect(exitButton).toBeInTheDocument();
    fireEvent.click(exitButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
