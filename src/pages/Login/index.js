import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { INITIAL_STATE, REGEX } from '../../common/defs';

import InputEmail from './components/InputLogin';
import InputPassword from './components/InputPassword';
import SubmitForm from './components/SubmitForm';

export default function Login() {
  const history = useHistory();
  const [state, setState] = useState(INITIAL_STATE);
  const { email, password } = state;

  function handleChange({ target: { name, value } }) {
    setState({
      ...state, [name]: value,
    });
  }

  function handleSubmit() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailInfo = JSON.stringify({ email });
    localStorage.setItem('user', emailInfo);
    history.push('/comidas');
  }

  return (
    <form className="form__login">
      <h1 className="title__login">App de Receitas</h1>
      <div className="form__group field">
        <InputEmail handleChange={ handleChange } />
      </div>
      <div className="form__group field">
        <InputPassword handleChange={ handleChange } />
      </div>
      <SubmitForm
        disabled={ !REGEX.test(email) || password.length <= '5' }
        handleSubmit={ handleSubmit }
      />
    </form>
  );
}
