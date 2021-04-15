import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getEmail } from '../actions/userEmail';
import { REGEX } from '../common/defs';

import logoOrange from '../images/xo-miojo-orange.png';
import food from '../images/food.png';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [localState, setLocalState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = localState;

  function handleChange({ target }) {
    const { name, value } = target;
    setLocalState({ ...localState, [name]: value });
  }

  function handleClick() {
    dispatch(getEmail(email));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailInfo = JSON.stringify({ email });
    localStorage.setItem('user', emailInfo);
    history.push('/comidas');
  }

  return (
    <div className="container-fluid login-page">
      <img src={ food } alt="food" className="mx-auto d-block mb-n3" />
      <img src={ logoOrange } alt="Xô Miojo" className="img-fluid" />
      <div className="container login-content">
        <form className="form-group p-4 d-flex flex-column">
          <label htmlFor="input-email" className="inputEmail4 font-weight-bold">
            E-mail:
            <input
              id="input-email"
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ handleChange }
              name="email"
              className="form-input form-control mt-2 font-weight-bold"
            />
          </label>
          <br />
          <label htmlFor="input-password" className="inputPassword4 font-weight-bold">
            Senha:
            <input
              id="input-password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              type="password"
              onChange={ handleChange }
              name="password"
              className="form-input form-control mt-2 font-weight-bold"
            />
          </label>
          <br />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ (!REGEX.test(email)) || (password.length <= '6') }
            onClick={ handleClick }
            className="btn btn-danger mb-2 font-weight-bold"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
