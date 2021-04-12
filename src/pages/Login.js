import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context/Context';
import { saveState } from '../services/LocalStorage';

import '../styles/Login.css';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(Context);

  const validateEmail = ({ target: { value } }) => {
    const isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!isValid || value.length === 0) {
      setEmail('');
    } else {
      setEmail(value);
    }
  };

  const validatePassword = ({ target: { value } }) => {
    const minPwdLength = 7;
    if (value.length < minPwdLength) {
      setPassword('');
    } else {
      setPassword(value);
    }
  };

  const submit = () => {
    saveState('user', { email });
    saveState('mealsToken', 1);
    saveState('cocktailsToken', 1);
  };

  return (
    <section className="login-form">
      <br />
      <form>
        <h1>Login</h1>
        <div>
          E-mail:
          <input
            type="email"
            name="email"
            onChange={ validateEmail }
            data-testid="email-input"
            placeholder="email@email.com"
            className="email-password"
          />
        </div>
        <br />
        <div>
          Senha:
          <input
            type="password"
            name="password"
            onChange={ validatePassword }
            data-testid="password-input"
            placeholder="Digite sua senha"
            className="email-password"
          />
        </div>
        <div>
          <NavLink to="/comidas">
            <button
              type="button"
              onClick={ submit }
              data-testid="login-submit-btn"
              disabled={ email === '' || password === '' }
              className="btn-submit"
            >
              Enter
            </button>
          </NavLink>
        </div>
      </form>
      <br />
    </section>
  );
}

export default Login;
