import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import userAction from '../redux/actions/userAction';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userAction({ email, password }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setRedirect(true);
  };

  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
    const PASSWORD_LENGTH = 6;

    if (regexEmail.test(email) && password.length > PASSWORD_LENGTH) {
      setVerification(true);
    }
    if (!regexEmail.test(email) || password.length <= PASSWORD_LENGTH) {
      setVerification(false);
    }
  }, [email, password.length]);

  return (
    <form className="form-container">
      {redirect && <Redirect to="/comidas" />}
      <div>
        <label htmlFor="email-login" className="form-label">
          Email address
          <input
            id="email-login"
            type="email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="password-login" className="form-label">
          Password
          <input
            id="password-login"
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ !verification }
        className="regular-button"
      >
        Entrar
      </button>
    </form>
  );
}
