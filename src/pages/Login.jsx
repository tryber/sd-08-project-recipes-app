import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import ContextReceitas from '../context/ContextReceitas';
import '../styles/login.css';
import logo from '../images/logo.png';

function Login() {
  const [info, setInfo] = useState({ email: '', password: '' });
  const { logedIn, setLoged } = useContext(ContextReceitas);
  function verificaEmailESenha(email, password) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minCaracteres = 7;
    const result = emailRegex.test(email) && password >= minCaracteres;
    return !result;
  }

  function handleChange({ target: { name, value } }) {
    setInfo({ ...info, [name]: value });
  }
  function handleClick() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: info.email }));
    setLoged(true);
  }

  return (
    <>
      <form>
        <div className="container">
          <div className="box">
            <h1 className="titulo">Receitas</h1>
            <img src={ logo } alt="imagem recipe" className="imagem" />
            <input
              type="email"
              name="email"
              id="email"
              data-testid="email-input"
              placeholder="Email"
              onChange={ handleChange }
              className="form-control"
            />
            {' '}
            <input
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
              placeholder="Password"
              onChange={ handleChange }
              className="form-control"

            />
            <button
              type="button"
              data-testid="login-submit-btn"
              disabled={ verificaEmailESenha(info.email, info.password.length) }
              onClick={ handleClick }
              className="btn btn-light button-color"
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
      {logedIn ? <Redirect to="/comidas" /> : false }

    </>
  );
}
export default Login;
