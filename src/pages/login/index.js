import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import GlobalContext from '../../context/globalContext/GlobalContext';
import UserContext from '../../context/userContext/UserContext';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const {
    values: {
      password,
    },
    functions: {
      handlePassword,
    },
  } = useContext(UserContext);

  const {
    values: {
      email,
    },
    functions: {
      handleEmail,
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;
    // Expressão Regex retirada no site "https://regexlib.com/Search.aspx?k=email&c=-1&m=-1&ps=20"
    const passwordLength = 6;

    if (emailRegex.test(email) && password.length > passwordLength) {
      setDisabled(false);
    }

    if (!emailRegex.test(email) || password.length <= passwordLength) {
      setDisabled(true);
    }
  }, [email, password.length]);

  const handleClick = () => {
    const user = { email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const obj = { cocktails: {}, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    setRedirect(true);
  };

  return (
    <section className="login-page">
      {redirect && <Redirect to="/comidas" />}
      <div className="login-container">
        <label htmlFor="email-input">
          <p>Email:</p>
          <input
            id="email-input"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ handleEmail }
            className="input-field"
          />
        </label>
        <label htmlFor="password-input">
          <p>Senha:</p>
          <input
            id="password-input"
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ handlePassword }
            className="input-field"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ handleClick }
          className="page-buttons"
        >
          Entrar
        </button>
      </div>
    </section>
  );
}

export default Login;
