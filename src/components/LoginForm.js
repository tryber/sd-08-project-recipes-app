import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/MyContext';
import '../styles/Login.css';

function LoginForm({ props }) {
  const { setEmail, setPassword, userEmail, password } = useContext(Context);
  const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail);
  const minimumLengthOfPassword = 6;
  const validatePassword = password.length > minimumLengthOfPassword;
  const isValid = validateEmail && validatePassword;
  const emailInput = { email: userEmail };

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(emailInput));
    props.history.push('/comidas');
  }

  return (
    <div className="loginContainer">
      <h3>App de Receitas</h3>
      <h5>Seja bem vindo(a)</h5>
      <div className="formContainer">
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
            name="email"
            onChange={ handleChangeEmail }
            placeholder="Seu email, por favor?"
            type="email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            name="password"
            onChange={ handleChangePassword }
            placeholder="Sua senha?"
            type="password"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isValid }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LoginForm;
