import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testConfig';
import App from '../App';

describe('Login page', () => {
  const rightEmail = 'alguem@email.com';
  it('path name is "/"', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndStore(<App />);
    expect(pathname).toBe('/');
  });

  it('have an email and password input', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Have a button with the text Entrar', () => {
    renderWithRouterAndStore(<App />, '/');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeInTheDocument();
  });

  it('validation inputs', () => {
    renderWithRouterAndStore(<App />, '/');
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);
    userEvent.type(email, 'email');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, rightEmail);
    userEvent.type(password, '23456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, rightEmail);
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
  });

  it('save the email in the store when the user login', () => {
    const { store } = renderWithRouterAndStore(<App />, '/');
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, rightEmail);
    userEvent.type(password, '1234567');
    fireEvent.click(button);

    expect(store.getState().login.email).toBe(rightEmail);
    // console.log(history.location);
    // expect(screen.getByRole('heading', { name: /comidas/i })).toBeInTheDocument();
  });
});
