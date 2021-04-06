import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from './App';

describe('Login', () => {
  it('Testa se existe os inputs do email, password e botão', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const emailLogin = getByTestId('email-input');
    const passwordLogin = getByTestId('password-input');
    const btnLogin = getByTestId('login-submit-btn');
  
    expect(emailLogin).toBeInTheDocument();
    expect(passwordLogin).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  it('Testa se o botão está desabilitado', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const emailLogin = getByTestId('email-input');
    const passwordLogin = getByTestId('password-input');
    const btnLogin = getByTestId('login-submit-btn');
  
    expect(btnLogin).toBeDisabled();

    fireEvent.change(emailLogin, {
      target: {
        value: 'emailExample',
      }
    });

    fireEvent.change(passwordLogin, {
      target: {
        value: '0123',
      }
    });

    expect(btnLogin).toBeDisabled();

    fireEvent.change(emailLogin, {
      target: {
        value: 'emailExample@',
      }
    });    

    fireEvent.change(passwordLogin, {
      target: {
        value: '01234',
      }
    });

    expect(btnLogin).toBeDisabled();

    fireEvent.change(emailLogin, {
      target: {
        value: 'emailExample@g.',
      }
    });
    
    fireEvent.change(passwordLogin, {
      target: {
        value: '012345',
      }
    });

    expect(btnLogin).toBeDisabled();

    fireEvent.change(emailLogin, {
      target: {
        value: 'emailExample@gmail.com',
      }
    });
    
    fireEvent.change(passwordLogin, {
      target: {
        value: '0123456',
      }
    });

    expect(btnLogin).not.toBeDisabled();
  });

  it('Testa se ao clicar no botão "Entrar", muda de pagina', async () => {
    const { getByText ,getByTestId, history } = renderWithRouter(<App />);

    const NextBtn = getByTestId('login-submit-btn');

    fireEvent.click(NextBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
