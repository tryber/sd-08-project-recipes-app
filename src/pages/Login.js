import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import StyledLogin from '../styles/login';
import recipeBook from '../images/recipe-book.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function buttonAble() {
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minOfCaracteres = 6;
    if (validEmail.test(email) && password.length > minOfCaracteres) {
      return true;
    }
    return false;
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <StyledLogin>
      <img src={ recipeBook } alt="Recipe Book" />
      <input
        type="text"
        name="email"
        placeholder="Email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !buttonAble() }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </StyledLogin>
  );
}

export default Login;
