import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Context from '../../contextApi/Context';
import './login.css';

function Login() {
  const {
    setEmail,
    email,
    setPassword,
    password,
    saveToLocalStorage,
  } = useContext(Context);

  const [disableds, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const validations = () => {
      const PASSWRDLENGTH = 6;
      const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      if (
        password &&
        password.length > PASSWRDLENGTH &&
        email &&
        re.test(email) === true
      ) {
        setDisabled(false);
      }
    };
    validations();
  }, [email, password]);

  const submit = () => {
    saveToLocalStorage();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    setRedirect(true);
  };
  return (
    <div className="form-login">
      {redirect && <Redirect to="/comidas" />}
      <label htmlFor="email">
        <input
          type="email"
          placeholder="Email..."
          data-testid="email-input"
          name="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          placeholder="Senha..."
          data-testid="password-input"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button
        variant="warning"
        data-testid="login-submit-btn"
        onClick={submit}
        disabled={disableds}
      >
        Entrar
      </Button>
    </div>
  );
}

export default Login;
