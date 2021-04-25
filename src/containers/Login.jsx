import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as core from '../core/index';
import rockGlass from '../images/rockGlass.svg';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setvalidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const isValidEmail = core.validateEmail(email);
    console.log('validEmail', isValidEmail);
    if (isValidEmail) {
      return setvalidEmail(true);
    }
    return () => setvalidEmail(false);
  }, [email, setvalidEmail]);

  useEffect(() => {
    const isValidPassword = core.validatePassword(password);
    console.log('validPassword', isValidPassword);
    if (isValidPassword) {
      return setvalidPassword(true);
    }
    return setvalidPassword(false);
  }, [password, setvalidEmail]);

  useEffect(() => {
    if (redirect) {
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('cocktailsToken', JSON.stringify(1));
      return history.push('/comidas');
    }
  }, [redirect, history, email]);
  return (
    <div data-testid="login">
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <form action="login" className="login">
          <legend className="login-title">Login</legend>
          <label htmlFor="email">
            <input
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              placeholder="Email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            <input
              type="text"
              name="password"
              id="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              placeholder="Password"
              data-testid="password-input"
            />
          </label>
        </form>
        <button
          type="button"
          disabled={ !(validEmail && validPassword) }
          data-testid="login-submit-btn"
          onClick={ () => setRedirect(true) }
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
