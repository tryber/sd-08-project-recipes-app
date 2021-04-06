import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getEmail } from '../actions/userEmail';

import { REGEX } from '../common/defs';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [localState, setLocalState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = localState;

  function handleChange({ target }) {
    const { name, value } = target;
    setLocalState({ ...localState, [name]: value });
  }

  function handleClick() {
    dispatch(getEmail(email));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailInfo = JSON.stringify({ email });
    localStorage.setItem('user', emailInfo);
    history.push('/comidas');
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <form className="form">
          <h1 className="form-title">App de Receitas - Login</h1>
          <label htmlFor="input-email">
            E-mail:
            <input
              id="input-email"
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ handleChange }
              name="email"
              className="form-input"
            />
          </label>
          <br />
          <label htmlFor="input-password">
            Senha:
            <input
              id="input-password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              type="password"
              onChange={ handleChange }
              name="password"
            />
          </label>
          <br />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ (!REGEX.test(email)) || (password.length <= '6') }
            onClick={ handleClick }
            className="form-button"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
