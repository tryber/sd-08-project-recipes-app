import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import * as core from '../core/index';
import rockGlass from '../images/rockGlass.svg';
import RecipesContext from '../core/RecipesContext';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setvalidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(RecipesContext);

  useEffect(() => {
    const isValidEmail = core.validateEmail(email);
    if (isValidEmail) {
      setUser(email);
      return setvalidEmail(true);
    }
    return () => setvalidEmail(false);
  }, [email, setvalidEmail, setUser]);

  useEffect(() => {
    const isValidPassword = core.validatePassword(password);
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
    }
  }, [redirect, history, email]);
  const TRYBE = 'TRYBE';
  return (
    <div data-testid="login">
      {redirect && <Redirect to="/comidas" />}
      <div className="meals">
        <span className="logo">{TRYBE}</span>
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
              className="form-control"
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
              className="form-control"
              type="password"
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
          className="btn btn-primary"
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
