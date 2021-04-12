import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../containers/Login';

const VALID_EMAIL = 'fulano@fulano.com';
const INVALID_EMAIL = 'ciclano@ciclano';
const PASSWORD = '12345678';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

describe('Test login page', () => {
  beforeEach(cleanup);

  it('check if the login page url is correct', async () => {
    const { history } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('checks if have an input of email of type text', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    expect(inputEmail).toBeInTheDocument();
  });

  it('checks if have an input of password of type password', () => {
    renderWithRouter(<Login />);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it('checks if have an button', () => {
    renderWithRouter(<Login />);
    const buttonLogin = screen.getByTestId(LOGIN_SUBMIT_BTN);
    expect(buttonLogin);
  });

  it('checks if when button is clicked the page is redirected to url /comidas',
    () => {
      const { history } = renderWithRouter(<Login />);
      userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
      userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
      expect(history.location.pathname).toBe('/comidas');
    });

  it(`checks if when a user type an invalid email and click on the button, 
    dont redirect the page`,
  () => {
    const { history } = renderWithRouter(<Login />);
    userEvent.type(screen.getByTestId(EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
    expect(history.location.pathname).toBe('/');
  });
});
