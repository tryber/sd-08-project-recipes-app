import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

const loginImg = 'https://firebasestorage.googleapis.com/v0/b/imagenator-ccdab.appspot.com/o/loginImg.png?alt=media&token=ad2a1328-9964-42eb-86a8-514c0e3811f5';

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
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const handleChange = ({ target }) => {
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
        <div className="login-img-container">
          <img className="login-img-logo" src={ loginImg } alt="logo" />
          <div className="center-items-div">
            <span>
              TastyFood´s
            </span>
          </div>
        </div>
        <form onSubmit={ onSubmit } className="form-box">
          <label htmlFor="email" className="input-label">
            Digite seu email:
            <input
              className="login-input"
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
          <label htmlFor="password" className="input-label">
            Digite sua Senha:
            <input
              className="login-input"
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
            className="input-login-button"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
