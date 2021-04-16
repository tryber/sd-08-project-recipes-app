import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RecipesContext from '../ContextApi/RecipesContext';
import './css/textInput.css';
import receitas from '../images/receitas.png';

function TextInput() {
  const {
    email,
    password,
    handleEmail,
    handlePassword,
  } = useContext(RecipesContext);

  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const NUMBER_SIX = 6;
    const emailValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minPassword = NUMBER_SIX;

    if (emailValid.test(email) && password.length > minPassword) {
      setDisabled(false);
    }
    if (!emailValid.test(email) || password.length <= minPassword) {
      setDisabled(true);
    }
  }, [email, password.length]);

  const handleClick = () => {
    const user = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(user));
    setRedirect(true);
  };

  return (
    <div className="div-login">
      <div className="login-form">
        { redirect && <Redirect to="/comidas" /> }
        <img src={ receitas } alt="receita" />
        <form>
          <label htmlFor="email-input">

            <input
              type="text"
              id="email-input"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ handleEmail }
              placeholder="email"
            />
          </label>
          <label htmlFor="password-input">

            <input
              type="password"
              id="password-input"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ handlePassword }
              placeholder="senha"
            />
          </label>
        </form>
        <Link to="/comidas">
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ disabled }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TextInput;
