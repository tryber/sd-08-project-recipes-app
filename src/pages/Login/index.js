import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';
import InputPassword from '../../components/InputPassword';
import InputText from '../../components/InputText';
import './styles.css';
import {
  initializeLocalStorageTokens,
  saveUserEmailInLocalStorage } from '../../services/localStorage';
import logo from '../../images/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [redirect, setRedirect] = useState(false);

  // Following RegEx found at: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // I had to split the RegEx to fix the linter issues. I've found how to solve it here:
  // https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
  const validEmail = (userEmail) => {
    const emailRegex = new RegExp([
      '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()',
      '[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()',
      '[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
    ].join(''));
    return emailRegex.test(userEmail);
  };
  useEffect(() => {
    const MINIMAL_PASSWORD_LENGTH = 6;
    if (password.length > MINIMAL_PASSWORD_LENGTH && validEmail(email)) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [password, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    initializeLocalStorageTokens();
    saveUserEmailInLocalStorage(email);
    setRedirect(true);
  };

  return (
    <>
      { redirect && <Redirect to="/comidas" /> }
      <Grid
        container
        justify="center"
        alignItems="center"
        className="root-login"
      >
        <Grid item xs={ 10 }>
          <Card component="form" className="card-login">
            <img src={ logo } alt="Logo" />
            <InputText
              label="Email"
              name="email-input"
              type="email"
              value={ email }
              updateState={ setEmail }
              fullWidth
            />
            <InputPassword
              label="Password"
              name="password-input"
              value={ password }
              fullWidth
              updateState={ setPassword }
            />
            <Button
              type="submit"
              variant="contained"
              data-testid="login-submit-btn"
              disabled={ disableSubmit }
              onClick={ handleSubmit }
            >
              Login
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
