import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../configs/renderWithRouter';
import { login } from '../constants/index';
import App from '../App';

let container = null;
beforeEach(() => {
  // DOM as render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clear
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('01) Renders the App and Login Page', () => {
  it('should render Login page on route /.', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const linkElement = getByTestId('login');

    expect(history.location.pathname).toBe('/');
    expect(linkElement).toBeInTheDocument();
  });

  it('should render email input with data-testid=`email-input`.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailIput = getByTestId('email-input');

    expect(emailIput).toBeInTheDocument();
  });

  it('should render password input with data-testid=`password-input`.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const passwordInput = getByTestId('email-input');

    expect(passwordInput).toBeInTheDocument();
  });

  it('should render button with data-testid=`login-submit-btn`.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginButton = getByTestId(('login-submit-btn'));

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('should makes the email, password, and button fields validation.', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const loginButton = getByTestId(login.DATA_TEST_ID_LOGING_BTN);
    expect(loginButton).toBeDisabled();

    const emailInput = getByTestId(login.DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(login.DATA_TEST_ID_PASSWORD);

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'email@com@');
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'emailcom@');
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, login.VALID_EMAIL);
    userEvent.type(passwordInput, '23456');
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'alguem@email.');
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, login.VALID_EMAIL);
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    expect(loginButton).toBeEnabled();
  });

  it(`after clicking on login button should save the email on
    localStorage "user: { email: email-da-pessoa }"`, () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(login.DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(login.DATA_TEST_ID_PASSWORD);
    const loginButton = getByTestId(login.DATA_TEST_ID_LOGING_BTN);

    userEvent.type(emailInput, login.VALID_EMAIL);
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    fireEvent.click(loginButton);

    const store = JSON.parse(localStorage.getItem('user'));
    console.log(store);

    expect(store.email).toBe(login.VALID_EMAIL);
  });

  it('should redirect to \'/comidas\' after click on button.', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const emailInput = getByTestId(login.DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(login.DATA_TEST_ID_PASSWORD);
    const loginButton = getByTestId(login.DATA_TEST_ID_LOGING_BTN);

    userEvent.type(emailInput, login.VALID_EMAIL);
    userEvent.type(passwordInput, login.VALID_PASSWORD);
    fireEvent.click(loginButton);

    expect(history.push).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/comidas');
  });
});
