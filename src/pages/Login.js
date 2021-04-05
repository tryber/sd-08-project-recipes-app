import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../store/ducks/user';
import * as storage from '../services/storage';
import PrimaryButton from '../components/PrimaryButton';

import styles from '../styles/pages/Login.module.css';

const MIN_PASSWORD_LENGTH = 6;

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function isFormValid() {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
      && password.length > MIN_PASSWORD_LENGTH);
  }

  function handleLogin() {
    login(email);
    storage.setMealsToken('1');
    storage.setCocktailsToken('1');
    storage.updateUser({ email });
    history.push('/comidas');
  }

  return (
    <div className={ styles.loginContainer }>
      <h1>Login</h1>
      <form className={ styles.loginForm }>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <PrimaryButton
          data-testid="login-submit-btn"
          disabled={ !isFormValid() }
          onClick={ handleLogin }
        >
          Login
        </PrimaryButton>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
