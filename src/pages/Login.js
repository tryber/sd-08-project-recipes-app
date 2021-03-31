import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import './Login.css';
import { LoginAndFoodContext } from '../context/ContextFood';

function Login() {
  const dataContext = useContext(LoginAndFoodContext);

  const {
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
    checkValidity,
  } = dataContext;
  return (
    <div className="container-form-login">
      <form onSubmit={ (e) => handleSubmit(e) }>
        <label className="label-login-form" htmlFor="email-input">
          Email
          <input
            onChange={ (e) => handleChangeEmail(e.target.value) }
            id="email-input"
            data-testid="email-input"
          />
        </label>
        <label className="label-login-form" htmlFor="password-input">
          Senha
          <input
            className="password-input"
            onChange={ (e) => handleChangePassword(e.target.value) }
            id="password-input"
            data-testid="password-input"
          />
        </label>
        <Button
          disabled={ checkValidity() }
          id="login-submit-btn"
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}

export default Login;
