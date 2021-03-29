import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const minimumNameSize = 6;
    const { email, password } = user;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidPassword = password.length > minimumNameSize;
    if (isValidEmail && isValidPassword) {
      setIsDisabled(false);
      console.log(isValidEmail, isValidPassword, password.length);
    } else {
      console.log('else');
      setIsDisabled(true);
    }
  }, [user]);

  const handleChange = ({ target }) => {
    console.log('mudou');
    setUser({ ...user, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setRedirect(true);
  };

  return (
    <>
      { redirect && <Redirect to="/comidas" /> }
      <div className="login-container">
        <form onSubmit={ onSubmit }>
          <label htmlFor="email">
            Digite seu email:
            <input
              id="email"
              name="email"
              value={ user.email }
              placeholder="email@email.com"
              type="email"
              data-testid="email-input"
              onChange={ handleChange }
              required
            />
          </label>
          <label htmlFor="password">
            Digite sua Senha:
            <input
              id="password"
              name="password"
              value={ user.password }
              placeholder="Password"
              type="password"
              data-testid="password-input"
              onChange={ handleChange }
              required
            />
          </label>
          <button
            data-testid="login-submit-btn"
            type="submit"
            disabled={ isDisabled }
          >
            {' '}
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
