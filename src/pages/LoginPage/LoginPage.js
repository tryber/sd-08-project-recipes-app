import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateLogin, saveOnStorage } from '../../services/utils';
import { redirectLogin } from '../../redux/actions';

import './LoginPage.css';
import quatorzeBis from '../../images/14Bis.png';

function enterButtonActions(email, dispatch) {
  const testToken = 1;
  const user = {
    email,
  };

  saveOnStorage('cocktailsToken', testToken);
  saveOnStorage('mealsToken', testToken);
  saveOnStorage('user', user);

  dispatch(redirectLogin());
}

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState('');
  const [passLength, setPassLength] = useState(0);
  const loginRedirect = useSelector((state) => state.loginReducer.loginRedirect);
  const dispatch = useDispatch();
  if (loginRedirect) {
    return <Redirect to="/comidas" />;
  }
  return (
    <div className="login-page">
      <form>
        <div className="logo"><img src={ quatorzeBis } alt="Logo Quatorze Bis" /></div>
        <input
          data-testid="email-input"
          type="email"
          value={ emailInput }
          onChange={ ({ target: { value } }) => setEmailInput(value) }
        />
        <input
          data-testid="password-input"
          type="password"
          onChange={ ({ target: { value } }) => setPassLength(value.length) }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ validateLogin(emailInput, passLength) }
          onClick={ () => enterButtonActions(emailInput, dispatch) }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
