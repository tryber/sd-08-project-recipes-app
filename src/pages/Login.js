import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const verifyFieldsValidation = () => {
      const MINIMAL_PASSWORD_CHARS = 6;

      // Regex got from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const emailRegex = new RegExp([
        '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
        '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
        '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      ].join(''));

      const isEmailValid = emailRegex.test(email);
      const isPasswordValid = password.length > MINIMAL_PASSWORD_CHARS;

      setIsDisabled(!(isEmailValid && isPasswordValid));
    };

    verifyFieldsValidation();
  }, [email, password]);

  const localStorages = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <div className="pageContainer">
      <div className="pageOpacity" />

      <div className="formContainer">
        <div className="inputContainer">
          <FiMail size={ 25 } />
          <input
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </div>
        <div className="inputContainer">
          <FiLock size={ 25 } />
          <input
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </div>
        <button
          type="submit"
          className="loginBtn"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ localStorages }
        >
          Entrar
        </button>
      </div>
    </div>

  );
};

export default Login;
