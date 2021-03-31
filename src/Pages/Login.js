import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkValidity = () => {
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length <= MIN_PASSWORD_LENGTH) return false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
  };

  const saveToken = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    history.push('/comidas');
  };

  return (
    <div className="login-body">
      <div className="login-content">
        <div className="title">
          <h1>  `Nome do app`  </h1>
        </div>
        <input
          type="text"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }

        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !checkValidity() }
          onClick={ saveToken }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
