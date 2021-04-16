import React from 'react';
import { screen } from '@testing-library/dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import App from '../App';

const EMAIL_INPUT = 'email@mail.com';

const INITIAL_ENTRIES = {
  initialEntries: ['/perfil'],
  initialState: {
    user: {
      email: EMAIL_INPUT,
      password: '1234567',
    },
  },
};

describe('ProfilePage.js', () => {
  test('if the Profile page render', () => {
    renderWithReduxandRouter(
      <LocalStorageMock items={ { user: JSON.stringify({ email: EMAIL_INPUT }) } }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );
    const ALL_BTN_LENGTH = 3;

    const profileIcon = screen.getByTestId('profile-top-btn');
    const heading = screen.getByRole('heading', { level: 1, name: /Perfil/i });
    const profileEmail = screen.getByTestId('profile-email');
    const allBtns = screen.getAllByRole('button');

    expect(profileIcon).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('email@mail.com');
    expect(allBtns.length).toBe(ALL_BTN_LENGTH);
  });

  test('if the profile-done-btn redirect to doneRecipes page', () => {
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ { user: JSON.stringify({ email: EMAIL_INPUT }) } }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  test('if the profile-favorite-btn redirect to favoriteRecipes page', () => {
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ { user: JSON.stringify({ email: EMAIL_INPUT }) } }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });

  test('if the profile-logout-btn redirect to Login page', () => {
    const { history } = renderWithReduxandRouter(
      <LocalStorageMock items={ { user: JSON.stringify({ email: EMAIL_INPUT }) } }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const userToken = localStorage.getItem('user');
    expect(userToken).not.toBe(EMAIL_INPUT);
  });

  test('if the there is no user logged in', () => {
    renderWithReduxandRouter(
      <LocalStorageMock items={ {} }>
        <App />
      </LocalStorageMock>, INITIAL_ENTRIES,
    );

    const profileEmail = screen.queryByTestId('profile-email');
    expect(profileEmail).not.toBeInTheDocument();

    const userToken = localStorage.getItem('user');
    expect(userToken).not.toBe(EMAIL_INPUT);
  });
});
